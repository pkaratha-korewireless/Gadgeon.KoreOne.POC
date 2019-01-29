using GraphQL;
using GraphQL.Http;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Poc.Api
{
    public class GraphQLMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IDocumentWriter _writer;
        private readonly IDocumentExecuter _executer;
        private readonly PoCSchema _schema;

        public GraphQLMiddleware(RequestDelegate next, IDocumentWriter writer, IDocumentExecuter executer, PoCSchema schema)
        {
            _next = next;
            _writer = writer;
            _executer = executer;
            _schema = schema;
        }

        public async Task Invoke(HttpContext context, PoCSchema schema)
        {
            if (!IsGraphQLRequest(context))
            {
                await _next(context);
                return;
            }

            await ExecuteAsync(context, schema);
       }

        private bool IsGraphQLRequest(HttpContext context)
        {
            return context.Request.Path.StartsWithSegments("/graphql")
                && string.Equals(context.Request.Method, "POST", StringComparison.OrdinalIgnoreCase);
        }

        private async Task ExecuteAsync(HttpContext context, PoCSchema schema)
        {
            var request = Deserialize<GraphQLRequest>(context.Request.Body);

            var result = await _executer.ExecuteAsync(_ =>
            {
                _.Schema = schema;
                _.Query = request.Query;
            });

            // result.

            //result.Data = null;

            await WriteResponseAsync(context, result);
        }

        private async Task WriteResponseAsync(HttpContext context, ExecutionResult result)
        {
            var json = _writer.Write(result);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = result.Errors?.Any() == true ? (int)HttpStatusCode.BadRequest : (int)HttpStatusCode.OK;

            await context.Response.WriteAsync(json);
        }

        public static T Deserialize<T>(Stream s)
        {
            using (var reader = new StreamReader(s))
            using (var jsonReader = new JsonTextReader(reader))
            {
                var ser = new JsonSerializer();
                return ser.Deserialize<T>(jsonReader);
            }
        }
    }
}
