using MongoDB.Driver;
using serverapi.Dac.Contract;
using serverapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace serverapi.Dac
{
    public class ItemDac : IItemDac
    {
        IMongoCollection<Item> Collection { get; set; }

        public ItemDac(DatabaseConfigurations config)
        {
            var settings = MongoClientSettings.FromUrl(new MongoUrl(config.MongoDBConnection));
            settings.SslSettings = new SslSettings()
            {
                EnabledSslProtocols = SslProtocols.Tls12
            };
            var mongoClient = new MongoClient(settings);
            var database = mongoClient.GetDatabase(config.DatabaseName);
            Collection = database.GetCollection<Item>("item");
        }

        public Item Get(Expression<Func<Item, bool>> expression)
        {
            return Collection.Find(expression).FirstOrDefault();
        }

        public IEnumerable<Item> List(Expression<Func<Item, bool>> expression)
        {
            return Collection.Find(expression).ToList();
        }

        public void Create(Item document)
        {
            Collection.InsertOne(document);
        }

        public void Update(Item document)
        {
            Collection.ReplaceOne(it => it.Id == document.Id, document);
        }
    }
}
