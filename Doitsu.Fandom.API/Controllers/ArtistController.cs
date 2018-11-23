﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doitsu.DBManager.Fandom.Models.ViewModels;
using Doitsu.DBManager.Fandom.Services;
using Doitsu.Fandom.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private IArtistService artistService;
        public ArtistController(IArtistService artistService)
        {
            this.artistService = artistService;
        }

        [Route("list")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string name, [FromQuery]string code )
        {
            var listArtist = this.artistService.GetActiveByQuery(limit, pageSize, currentPage, name);
            return Ok(BaseResponse<IEnumerable<ArtistViewModel>>.PrepareDataSuccess(listArtist, "Get list artists successful!"));
        }
        [Route("create")]
        public ActionResult Post([FromBody]ArtistViewModel artistAPIVM)
        {
            var artistVM = this.artistService.Create(artistAPIVM);
            return Ok();
        }
    }
}