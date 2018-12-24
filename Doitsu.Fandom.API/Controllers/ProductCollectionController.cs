using System;
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
    [Route("api/product-collection")]
    [ApiController]
    public class ProductCollectionController : ControllerBase
    {
        private IProductCollectionService productCollectionService;
        public ProductCollectionController(IProductCollectionService productCollectionService)
        {
            this.productCollectionService = productCollectionService;
        }
        [AllowAnonymous, Route("read")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string code, [FromQuery]int? id)
        {
            var listArtist = this.productCollectionService.GetActiveByQuery(limit, pageSize, currentPage,  code, id);
            return Ok(BaseResponse<IEnumerable<ProductCollectionViewModel>>.PrepareDataSuccess(listArtist, "Get list artists successful!"));
        }
        [Route("create")]
        public ActionResult Post([FromBody]ProductCollectionViewModel productRequestVM)
        {
            var productCollectionVM = this.productCollectionService.Create(productRequestVM);
            return Ok(BaseResponse<ProductCollectionViewModel>.PrepareDataSuccess(productCollectionVM, "Create a artist successful!"));
        }
        [Route("update")]
        public async Task<ActionResult> Put([FromBody]ProductCollectionViewModel productRequestVM)
        {
            var productCollectionVM = await this.productCollectionService.UpdateAsync(productRequestVM.ID, productRequestVM);
            return Ok(BaseResponse<ProductCollectionViewModel>.PrepareDataSuccess(productCollectionVM, "Update the artist successful!"));
        }
        [Route("delete")]
        public async Task<ActionResult> Delete([FromQuery]ProductCollectionViewModel model)
        {
            await this.productCollectionService.DeactiveAsync(model.ID);
            return Ok(BaseResponse<ProductCollectionViewModel>.PrepareDataSuccess(model, "Delete the artist successful!"));
        }
    }
}