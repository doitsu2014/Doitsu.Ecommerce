using AutoMapper;
using Doitsu.Service;
using System;
using System.Collections.Generic;
using System.Text;
using Doitsu.Service.Core;
using Doitsu.Fandom.DbManager.Models;

namespace Doitsu.Fandom.DBManager.ViewModels
{
    public class ArtistViewModel : BaseViewModel<Artist>
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string AvatarUrl { get; set; }
        public bool Active { get; set; }
        public string Description { get; set; }

    }
}
