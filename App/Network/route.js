import AsyncStorage from "@react-native-community/async-storage";
import { TOKEN } from '../helper/Constant';

export default class Route {

  constructor(rootUrl) {

    this.rootUrl = rootUrl;
    this.tokenStringify = AsyncStorage.getItem(TOKEN)
  }

  get = async url => {
    try {
      const response = await fetch(this.rootUrl + url);
      return await response.json();
    } catch (e) {
      return e;
    }
  };
  getAuthenticated = async (url, token = "kchbhini") => {
    console.log(token, "this is token")
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      return e;
    }
  };

  postAuthenticated = async (url, data, token = "kchbhini") => {
    console.log(url, 'data');
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      const response_1 = await this.checkStatus(response);
      return response_1.json();
    } catch (e) {
      return e;
    }
  };

  getAuthenticatedMessage = async (url, token) => {
    //console.log("URL actually"+this.rootUrl  + url);
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return await response.json();
    } catch (e) {
      return e;
    }
  };
  sendMessage = async (url, data, token) => {
    console.log('URL actually' + this.rootUrl + url);
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      return e;
    }
  };

  post = async (url, data) => {
    console.log(url, 'url');
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      });
      const response_1 = await this.checkStatus(response);
      return response_1.json();
    } catch (e) {
      return e;
    }
  };
  put = async (url, data, token) => {
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      return e;
    }
  };
  UploadImage = async (url, data, token) => {
    console.log(url, data, token);
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: data,
      });
      console.log(response, "this is response");
      response.json();
    } catch (e) {
      console.log(e, "error");
    }
  };

  updateData = async (url, data, token) => {
    console.log('dataurl', this.rootUrl + url);
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      return e;
    }
  };

  postdata = async (url, data) => {
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      return e;
    }
  };

  postfile = async (url, data) => {
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: data,
      });
      const response_1 = await this.checkStatus(response);
      return response_1.json();
    } catch (e) {
      return e;
    }
  };
  deleteApi = async (url, data) => {
    try {
      const response = await fetch(this.rootUrl + url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
        body: data,
      });
      const response_1 = await this.checkStatus(response);
      return response_1.json();
    } catch (e) {
      return e;
    }
  };

  postfile_x = (url, data) => {
    return fetch(this.rootUrl + url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: data,
    });
  };

  checkStatus = response => {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}
