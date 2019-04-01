﻿using System;
using Loggly.Config;

namespace Doitsu.Fandom.API.Models
{
    public class LogglyModel
    {
        public string ApplicationName { get; set; }
        public string Account { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int EndpointPort { get; set; }
        public bool IsEnabled { get; set; }
        public bool ThrowExceptions { get; set; }
        public LogTransport LogTransport { get; set; }
        public string EndpointHostname { get; set; }
        public string CustomerToken { get; set; }
    }
}
