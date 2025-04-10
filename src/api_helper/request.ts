import { APIRequestContext, APIResponse } from "@playwright/test";

export class BaseAPI {
  request: APIRequestContext;
  response: APIResponse;
  bodyDefaultRequest = {};

  constructor(request?: APIRequestContext) {
    if (request) this.request = request;
  }

  //POST|method
  protected async doPost(
    endpoint: string,
    body: any,
    header?: any
  ): Promise<APIResponse> {
    console.log("POST | " + endpoint);
    this.response = await this.request.post(endpoint, {
      headers: header,
      data: body,
    });
    console.log(`Body request: ${endpoint} :` + JSON.stringify(body));
    try {
      console.log(
        `Body response ${endpoint} :` +
          JSON.stringify(JSON.parse(await this.response.text()))
      );
    } catch (error) {
      console.log("Response is not Json");
    }
    return this.response;
  }

  //GET|method
  protected async doGet(
    endpoint: string,
    headers: any,
    params?: any
  ): Promise<APIResponse> {
    console.log("GET | " + endpoint);
    this.response = await this.request.get(endpoint, {
      headers: headers,
      params: params,
    });
    console.log(
      `Body response ${endpoint} :` +
        JSON.stringify(JSON.parse(await this.response.text()))
    );
    return this.response;
  }

  //DELETE|method
  protected async doDelete(endpoint: string): Promise<APIResponse> {
    console.log("DELETE | " + endpoint);
    this.response = await this.request.delete(endpoint);
    console.log(
      `Body response ${endpoint} :` +
        JSON.stringify(JSON.parse(await this.response.text()))
    );
    return this.response;
  }

  //PUT|method
  protected async doPut(
    endpoint: string,
    body: any,
    header?: any
  ): Promise<APIResponse> {
    console.log("PUT | " + endpoint);
    this.response = await this.request.put(endpoint, {
      headers: header,
      data: body,
    });
    console.log(`Body request ${endpoint} :` + JSON.stringify(body));
    console.log(
      `Body response ${endpoint} :` +
        JSON.stringify(JSON.parse(await this.response.text()))
    );
    return this.response;
  }

  //PATCH|method
  protected async doPatch(
    endpoint: string,
    body: any,
    header?: any
  ): Promise<APIResponse> {
    console.log("PATCH | " + endpoint);
    this.response = await this.request.patch(endpoint, {
      headers: header,
      data: body,
    });
    console.log(`Body request ${endpoint} :` + JSON.stringify(body));
    console.log(
      `Body response ${endpoint} :` +
        JSON.stringify(JSON.parse(await this.response.text()))
    );
    return this.response;
  }
}
