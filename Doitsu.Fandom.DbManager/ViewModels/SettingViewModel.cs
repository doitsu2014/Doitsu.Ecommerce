using System;
using System.Collections.Generic;
using System.Text;

namespace Doitsu.Fandom.DBManager.ViewModels
{
    public class SliderViewModel
    {
        /// <summary>
        /// Because this view model represent to id of their tabel
        /// Pattern { Slider Type - Tabel Id }
        /// </summary>
        public string OriginalId { get; set; }
        public string Title { get; set; }
        public string ThumbnailURL { get; set; }
        public string Slug { get; set; }
        /// <summary>
        /// References to SliderTypeEnum
        /// </summary>
        public int Type { get; set; }
        public bool IsSlider { get; set; }
    }
}