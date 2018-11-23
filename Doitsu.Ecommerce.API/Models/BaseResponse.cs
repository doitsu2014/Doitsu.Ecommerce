using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doitsu.Ecommerce.API.Models
{
    public class BaseResponse<T>
    {
        public BaseResponse()
        {

        }
        public BaseResponse(T data, bool success = false, string message = "")
        {
            this.Message = message;
            this.Success = success;
            this.Data = data;
        }
        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("success")]
        public bool Success { get; set; }
        [JsonProperty("data")]
        public T Data { get; set; }

        public static BaseResponse<T> PrepareData(T data, bool success = false, string message = "" )
        {
            return new BaseResponse<T>(data, success, message);
        }
        public static BaseResponse<T> PrepareDataSuccess(T data, string message = "")
        {
            return new BaseResponse<T>(data, true, message);
        }
        public static BaseResponse<T> PrepareDataFail(T data, string message = "")
        {
            return new BaseResponse<T>(data, false, message);
        }
    }
}
