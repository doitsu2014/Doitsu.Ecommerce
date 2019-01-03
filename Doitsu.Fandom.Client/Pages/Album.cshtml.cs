using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Doitsu.Fandom.Client.Pages
{
    public class AlbumModel : PageModel
    {
        public string Slug { get; set; }

        public void OnGet(string slug)
        {
            Slug = slug;
        }
    }
}