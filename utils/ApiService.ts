//需要引用wx-promise-pro库,如果在全局入口中已配置,则此处可省略
import "wx-promise-pro";
// import regeneratorRuntime from "wx-promise-pro";

/**
 * Token处理器接口
 */
export interface ITokenHandler {

  /**
   * 刷新Token,应返回token值,如果返回的promise中所返回的token为空，则认为刷新失败
   */
  refereshToken: () => Promise<string>;

  /**
   * 获取当前本地缓存的token
   */
  getToken: () => string;

  /**`
   * 接收到了服务端返回的token，仅针对接口返回的{@link IRespData#token}有值的情况
   */
  onTokenReceived: (token: string) => void;
}

/**
 * 服务端接口数据形态定义
 */
interface IRespData<T> {
  code: number;
  msg?: string;
  data?: T;
  token?: string;//获取token的接口也许使用这个字段，而不用data
}


/**
 * 网络请求结果基类，通过{@linkplain BaseResp#getData}得到的对象只能调用成员属性，不能调用对象上面的方法。这是"鸭子辨型法"的结果
 */
export class BaseResp<T> {

  public static STATUS_CODE_ERROR: number = -100;
  public static STATUS_CODE_DEFAULT: number = -1;
  public static STATUS_CODE_SUCCESS: number = 200;
  public static CODE_TOKEN_EXPIRED: number = 100;

  private data?: T;
  private code: number = BaseResp.STATUS_CODE_DEFAULT;
  private msg?: string;
  private httpSuccess: boolean = false;
  private statusCode: number = 0;

  public setInfo(httpSuccess: boolean, statusCode: number, code: number, msg?: string, data?:T) {
    this.httpSuccess = httpSuccess;
    this.statusCode = statusCode;
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  /**
   * 通过{@linkplain BaseResp#getData}得到的对象只能调用成员属性，不能调用对象上面的方法。这是"鸭子辨型法"的结果
   */
  public getData(): T|undefined {
    return this.data;
  }

  /**
   * 调用此方法前应先判断data是否存在，可以先使用{@link #isSuccess}判断为true后，再直接调用此方法获得结果。
   * 通过{@linkplain BaseResp#getData}得到的对象只能调用成员属性，不能调用对象上面的方法。这是"鸭子辨型法"的结果
   */
  public getDataTyped(): T {
    return <T>this.data;
  }

  public getCode() {
    return this.code;
  }

  public getStatusCode() {
    return this.statusCode;
  }

  public getMsg(): string | undefined {
    return this.msg;
  }

  /**
   * 只判断code为{@link BaseResp#STATUS_CODE_SUCCESS}
   */
  public isSuccessByCode(): boolean {
    return this.httpSuccess && this.code == BaseResp.STATUS_CODE_SUCCESS;
  }

  /**
   * 判断{@link isSuccessByCode()} ,并且{@link #data} 有值
   */
  public isSuccess(): boolean {
    return this.isSuccessByCode() && this.data != undefined && this.data != null;
  }


  public isTokenExpired(): boolean {
    return this.code == BaseResp.CODE_TOKEN_EXPIRED;
  }
}

/**
 * 服务Api调用类,可以通过设置{@link ApiService#ApiTokenHandler}来设置token处理类
 */
export class ApiService {

  static ApiTokenHandler: ITokenHandler;

  /**
   * 发送Post请求
   * @param url
   * @param data
   */
  public static async requestPost<T>(url: string, data?: string | IAnyObject | ArrayBuffer): Promise<BaseResp<T>> {
    return this.innerHandle<T>(url, data, "POST");
  }

  /**
   * 发送Get请求
   * @param url
   * @param data
   */
  public static async requestGet<T>(url: string, data?: string | IAnyObject | ArrayBuffer): Promise<BaseResp<T>> {
    return this.innerHandle<T>(url, data, "GET");
  }

  private static createInstance<T, A extends BaseResp<T>>(c: new () => A): A {
    return new c();
  }

  private static createInstanceNoGeneric<A>(c: new () => A): A {
    return new c();
  }

  private static isEmpty(obj:any){
    return obj == null || obj == undefined || (typeof obj =='string' && obj.length==0);
  }

  /**
   * 封装请求结果，进行全局错误处理.
  * 由于“鸭子辨型法”，泛型转换只是为了让编译器正常通过，运行时直接转换的子类只能访问和修改属性，不能调用方法。
  * 该方法中对数据结果进行封装，通过值拷贝封装到一个真实对象上，从而操作数据
  * 
   * @param url 
   * @param method 
   * @param data 
   */
  private static async innerHandle<T>(url: string, data?: string | IAnyObject | ArrayBuffer, method?: "GET" | "POST"): Promise<BaseResp<T>> {
    let resp = new BaseResp<T>();
    try {
      const wxresp: wx.RequestSuccessCallbackResult = await this.sendRequest(url, data, method);
      console.log(`api response received for: ${url}`);
      console.log("response:", wxresp);

      const httpSuccess = wxresp && wxresp.statusCode.toString().startsWith("20");
      if (httpSuccess) {
        if (wxresp.data) {
          const httpData: IRespData<T> = wxresp.data ? <IRespData<T>>wxresp.data : { code: BaseResp.STATUS_CODE_DEFAULT };
          resp.setInfo(httpSuccess, wxresp.statusCode, httpData.code, httpData.msg, httpData.data);

          if (httpData.token && !this.isEmpty(this.ApiTokenHandler)) {
            //返回了token
             this.ApiTokenHandler.onTokenReceived(httpData.token);
          }
        }
      } else {
        resp.setInfo(false, wxresp.statusCode, 0, "服务端返回了出错信息");
      }

      console.log("check token");
      if (resp.isTokenExpired() && !this.isEmpty(this.ApiTokenHandler)) {
        console.log("token invalid. try refresh token...................................");
        //Token过期，自动刷新一次
        const token = await this.ApiTokenHandler.refereshToken();
        console.log(`token refreshed during request:${token}`);
        if (token != null && token != undefined && token.length > 0) {
          //重新请求一次，并返回结果，从而对上层无感
          resp = await this.innerHandle<T>(url, data, method);
        } else {
          console.log("refresh token failed!!!!!");
        }
      }

    } catch (error) {
      console.log("api error:", error);
      resp.setInfo(false, BaseResp.STATUS_CODE_ERROR, 0, "请求服务接口发生异常!");
    }
    return resp;
  }


  /**
   * 发送Get请求
   * @param url
   * @param data
   */
  private static sendRequest(url: string, data?: string | IAnyObject | ArrayBuffer, method: "GET" | "POST" = "GET"): Promise<wx.RequestSuccessCallbackResult> {
    console.log("wxpro send request:" + url);
    //添加共用参数
    const requestOp: wx.RequestOption = {
      url: url,
      data: data,
      dataType: "json",
      header: { "token": this.isEmpty(this.ApiTokenHandler) ? "" : this.ApiTokenHandler.getToken() },
      // header: {
      //   sId:1,
      //   bId:1,
      //   gId:1, 
      //   "token":"NTE4MDc1ODkwNjc3MDU1NDg4XzUxODA3NTg5MDY3NzA1NTQ4OF81MTgwNzU4OTA2NzcwNTU0ODhfMzg1XzE1NDQ0MzA2ODIwNzA=" },
      method: method
    };
    return wx.pro.request(requestOp);
  }

}

