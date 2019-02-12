using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRHub;

namespace SignalRHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpeedAnalysisController : ControllerBase
    {
        private IHubContext<SpeedAnalysisHub, ITypedHubClient> _hubContext;

        public SpeedAnalysisController(IHubContext<SpeedAnalysisHub, ITypedHubClient> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "speedanalysis" };
        }

        [HttpPost]
        public string Post([FromBody]string msg)
        {
            string retMessage = string.Empty;
            try
            {
                _hubContext.Clients.All.BroadcastMessage(msg);
                retMessage = "Success";
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            return retMessage;
        }
    }
}