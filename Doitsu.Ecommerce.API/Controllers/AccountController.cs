
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Doitsu.Ecommerce.API.Models;
using DoitsuService.Identities;
using DoitsuUtils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
//using Microsoft.AspNetCore.Mvc.Attributes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Doitsu.Ecommerce.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AuthorizeController : ControllerBase
    {

        public UserManager<ApplicationUser> _userManager;
        public AuthorizeController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody]LoginModel loginModel)
        {
            var user = await _userManager.FindByEmailAsync(loginModel.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                try
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.Default.GetBytes(DoitsuJWTValidators.SecretKey);
                    var issuer = DoitsuJWTValidators.Issuer;
                    var audience = DoitsuJWTValidators.Audience;


                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Issuer = issuer,
                        Audience = audience,
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name, user.Id.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var tokenString = tokenHandler.WriteToken(token);

                    // return basic user info (without password) and token to store client side
                    return Ok(new
                    {
                        token = tokenString,
                        validTo = token.ValidTo
                    });
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            return Unauthorized();
        }


        [HttpPost]
        [Route("register")]
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
                ApplicationUser newUser = new ApplicationUser()
                {
                    Email = email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = email
                };


                await _userManager.CreateAsync(newUser, password);
                return Ok(true);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
