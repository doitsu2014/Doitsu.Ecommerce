using System;
using System.Collections.Generic;
using System.Linq;
using Doitsu.DBManager.Fandom.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Doitsu.Fandom.API.Controllers
{

    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private IProductService productService;
        public ValuesController(IProductService productService)
        {
            this.productService = productService;
        }

        // GET api/values
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(productService.GetAll().ToList());
        }

        [HttpGet("claims")]
        [Authorize(Roles = "AppManager,ApiUser")]
        public ActionResult Claims()
        {

            return Ok(User.Claims.Select(c =>
                new
                {
                    Type = c.Type,
                    Value = c.Value
                })
            );
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
