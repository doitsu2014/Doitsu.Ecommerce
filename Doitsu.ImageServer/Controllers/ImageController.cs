using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using Doitsu.ImageServer.API.Models;
using Doitsu.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Doitsu.ImageServer.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private IHostingEnvironment _hostingEnvironment;
        private IConfiguration _configuration;

        public ImageController(IHostingEnvironment hostingEnvironment, IConfiguration configuration)
        {
            _hostingEnvironment = hostingEnvironment;
            _configuration = configuration;
        }

        [HttpPost("uploads")]
        public async Task<ActionResult> UploadFileAsync(IFormFile file)
        {
            try
            {
                string webRootPath = _hostingEnvironment.WebRootPath;
                string container = _configuration.GetSection("ImageContainerPath").Value;
                string userId = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.NameIdentifier)?.Value;
                string folderName = $"{container}/{userId}";
                string uploadPath = Path.Combine(webRootPath, folderName);

                string extension = Path.GetExtension(file.FileName);
                string fileName = $"{TimeUtils.GetTimeCode(7)}{extension}";

                if (file.Length > 0)
                {
                    if(!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }
                    using (var fileStream = new FileStream(Path.Combine(uploadPath, fileName), FileMode.Create))
                    {

                        await file.CopyToAsync(fileStream);
                    }
                }
                var hostName = Request.Host;
                var scheme = Request.Scheme;

                return Ok(BaseResponse<dynamic>.PrepareDataSuccess(new
                {
                    imageLink = $"{scheme}://{hostName}/{folderName}/{fileName}",
                }));
            }
            catch (Exception ex)
            {
                return Ok("Upload Failed: " + ex.Message);
            }
        }


    }
}