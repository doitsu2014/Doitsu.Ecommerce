using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public ActionResult Get()
        {
            return Ok(new
            {
                Welcome="Chào mừng bạn đến với API của chúng tôi!",
                APIVer="1.0",
                Description="API này dành cho dự án Doitsu.Fandom.\n Chân thành cảm ơn và chúc các bạn may mắn"
            });
        }
    }
}