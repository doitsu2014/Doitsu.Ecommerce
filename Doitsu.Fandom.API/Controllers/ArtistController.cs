using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.DBManager.Fandom.Services;
using Doitsu.Fandom.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private IArtistService artistService;
        public ArtistController(IArtistService artistService)
        {
            this.artistService = artistService;
        }

        [AllowAnonymous,Route("read")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string name, [FromQuery]string code, [FromQuery]int? id)
        {
            var listArtist = this.artistService.GetActiveByQuery(limit, pageSize, currentPage, name, code, id);
            return Ok(BaseResponse<IEnumerable<ArtistViewModel>>.PrepareDataSuccess(listArtist, "Get list artists successful!"));
        }
        [Route("create")]
        public ActionResult Post([FromBody]ArtistViewModel artistAPIVM)
        {
            var artistVM = this.artistService.Create(artistAPIVM);
            return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(artistVM, "Create a artist successful!"));
        }
        [Route("update")]
        public async Task<ActionResult> Put([FromBody]ArtistViewModel artistAPIVM)
        {
            var artistVM = await this.artistService.UpdateAsync(artistAPIVM.ID, artistAPIVM);
            return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(artistVM, "Update the artist successful!"));
        }
        [Route("delete")]
        public async Task<ActionResult> Delete([FromQuery]ArtistViewModel model)
        {
            await this.artistService.DeactiveAsync(model.ID);
            return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(model, "Delete the artist successful!"));
        }
    }
}