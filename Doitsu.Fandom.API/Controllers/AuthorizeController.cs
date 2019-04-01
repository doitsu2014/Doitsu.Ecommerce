
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Doitsu.Fandom.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Doitsu.Service.Core.IdentitiesExtension;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace Doitsu.Fandom.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AuthorizeController : ControllerBase
    {
        public DoitsuUserIntManager _userManager;
        private ILogger logger;
        public AuthorizeController(DoitsuUserIntManager userManager, ILogger<AuthorizeController> logger)
        {
            this.logger = logger;
            _userManager = userManager;
        }

        //public UserManager<DoitsuUserInt> _userManager;
        //public AuthorizeController(UserManager<DoitsuUserInt> userManager)
        //{
        //    _userManager = userManager;
        //}

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login([FromBody]LoginModel loginModel)
        {
            var user = await _userManager.FindByEmailAsync(loginModel.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                try
                {
                    var result = await user.AuthorizeAsync(_userManager, user);

                    // return basic user info (without password) and token to store client side
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    logger.LogWarning(StatusCodes.Status500InternalServerError, ex, "Login exception");
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
            return Unauthorized();
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> RegisterAsync([FromBody]RegisterModel registerModel)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var email = registerModel.Email;
                var password = registerModel.Password;
                var confirmPassword = registerModel.ConfirmPassword;
                DoitsuUserInt newUser = new DoitsuUserInt()
                {
                    Email = email,
                    UserName = email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                };
                await _userManager.CreateAsync(newUser, password);
                await _userManager.AddToRoleAsync(newUser, "ActiveUser");


                // Add role Administrator if register to admin
                var defaultAdminToken = "doitsu_admin";
                if (registerModel.IsAdmin)
                {
                    if (registerModel.RegisAdminToken == defaultAdminToken)
                    {
                        await _userManager.AddToRoleAsync(newUser, "Administrator");
                    }
                }

                return Ok(BaseResponse<dynamic>.PrepareDataSuccess(new { email = email }, $"You have been registered your account."));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
