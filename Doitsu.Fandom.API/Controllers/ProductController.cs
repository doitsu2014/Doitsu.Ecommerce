﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doitsu.DBManager.Fandom.Models.ViewModels;
using Doitsu.DBManager.Fandom.Services;
using Doitsu.Fandom.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService productService;
        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [AllowAnonymous, Route("read-by-slug")]
        public ActionResult Get([FromQuery]string slug)
        {
            var product = this.productService.FindBySlug(slug);
            return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(product, "Get product successful!"));
        }
        [AllowAnonymous, Route("count")]
        public ActionResult Get([FromQuery]int? collectionId)
        {
            var result = this.productService.CountProducts(collectionId);
            return Ok(BaseResponse<int>.PrepareDataSuccess(result, "Cout product success successful!"));
        }
        [AllowAnonymous, Route("read")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string name, [FromQuery]int? collectionId, [FromQuery]int? id)
        {
            var listProduct = this.productService.GetActiveByQuery(limit, pageSize, currentPage, name, collectionId, id);
            return Ok(BaseResponse<IEnumerable<ProductViewModel>>.PrepareDataSuccess(listProduct, "Get list products successful!"));
        }
        [Route("create")]
        public ActionResult Post([FromBody]ProductViewModel productAPIVM)
        {
            var productVM = this.productService.Create(productAPIVM);
            return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(productVM, "Create a product successful!"));
        }
        [Route("update")]
        public async Task<ActionResult> Put([FromBody]ProductViewModel productAPIVM)
        {
            try
            {
                var productVM = await this.productService.UpdateAsync(productAPIVM.Id, productAPIVM);
                return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(productVM, "Update the product successful!"));

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
        [Route("delete")]
        public async Task<ActionResult> Delete([FromQuery]ProductViewModel model)
        {
            await this.productService.DeactiveAsync(model.Id);
            return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(model, "Delete the product successful!"));
        }
    }
}