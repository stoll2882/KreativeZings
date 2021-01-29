const User = require('../models/User');
const Config = require('../config/serverconfig');
const CatalogItem = require('../models/CatalogItem');

class CatalogStorage {

    static stickerArray = [
        { id: '1', name: "Paper Thin Sticker", description: "Black and white Paper Thin sticker popular and ready for purchase!", image: 'Images/PaperThin.png', price: 3.0 },
        { id: '2', name: "Believe You Can Sticker", description: "Sticker to remind us all to Believe We Can accomplish whatever we put our minds to.", image: 'Images/BelieveYouCan.png', price: 3.0 },
        { id: '3', name: "Human Kind Sticker", description: "Human Kind - Be Both. A sticker to remind us to accept everyones flaws and be kind to eachother no matter what :)", image: 'Images/HumanKind.png', price: 3.0 },
        { id: '4', name: "Cute But Crazy Sticker", description: "Sticker inspired by my younger sister, who never fails to drive me Crazy but also NEVER fails to be absolutely adorable in the process.",  image: 'Images/CuteButCrazy.png', price: 3.0 },
        { id: '5', name: "Devil / Angel Sticker", description: "Devil sticker with Angel intertwined to remind us all that we all have dark sides.",  image: 'Images/Devil.png', price: 3.0 },
        { id: '6', name: "Enjoy Today Sticker", description: "Sticker labeled Enjoy Today to remind us all to live every day as if it were your last and not take any minutes for granted.",  image: 'Images/EnjoyToday.png', price: 3.0 },
        { id: '7', name: "Freedom Sticker", description: "Sticker with beautiful butterflys and the label Freedom. Inspired by my best friend who never fails to remind me I need to let go and fly sometimes!",  image: 'Images/Freedom.png', price: 3.0 },
        { id: '8', name: "You Smile Sticker", description: "Created this sticker labeled Be With Someone Who Makes You Smile to remind us we all all worthy of happiness so make sure you don't let anyone take that away from you!",  image: 'StickerImages/BeSmile.png', price: 3.0  },
        { id: '9', name: "Meh Sticker", description: "We all have those days... Meh",  image: 'Images/Meh.png', price: 3.0  },
        { id: '10', name: "Mindset Sticker", description: "Sticker meant to inspire with the saying Your Life is as Good as Your Mindset. Reminder to always stay positive because you never know whats on the other side!",  image: 'Images/Mindset.png', price: 3.0  },
        { id: '11', name: "Never Give Up Sticker", description: "Sticker inspired by some of my hardest times, labeled Never Give Up. Meant to remind myself and others to never stop fighting!!!",  image: 'Images/NeverGiveUp.png', price: 3.0  },
        { id: '12', name: "Olaf Sticker", description: "Olaf sticker saying Some People Are Worth Melting For. Inspired by my best friend who LOVES that quote.",  image: 'Images/Olaf.png', price: 3.0  },
        { id: '13', name: "Only Human Sticker", description: "Mandala sticker that says Only Human to remind us all we are in fact only human and cannot do it all!",  image: 'Images/OnlyHuman.png', price: 3.0  },
        { id: '14', name: "Pain Is Strong Sticker", description: "Sticker depicting the quote: Pain is strong you are stronger. Reminder there is nothing you cannot overcome.",  image: 'Images/PainIsStrong.png', price: 3.0  },
        { id: '15', name: "Smile Bright Sticker", description: "Sticker to remind you to smile! Because it makes the world a better place with more smiles :)",  image: 'Images/SmileBright.png', price: 3.0  },
        { id: '16', name: "Stand Out Sticker", description: "Sticker inspired by our own originality. You were born to stand out, just be your beautiful self.",  image: 'Images/StandOut.png', price: 3.0  },
        { id: '17', name: " You Are My Sunshine Sticker", description: "Sticker inspired by all the moms out there that sang this for years: You are my sunshine...",  image: 'Images/Sunshine.png', price: 3.0  },
        { id: '18', name: "The Best Is Yet To Come Sticker", description: "The best is yet to come! Just keep on going and good things will come :)",  image: 'Images/TheBest.png', price: 3.0  },
    ];    

    static init() {
    }

    static async getProduct(productId) {
        for(var x = 0; x < CatalogStorage.stickerArray.length; x++) {
            if(CatalogStorage.stickerArray[x].id == productId) {
                const sourceItem = CatalogStorage.stickerArray[x];
                const newItem = new CatalogItem(sourceItem.id, sourceItem.name, sourceItem.desceiption, sourceItem.image, sourceItem.price);
                return newItem;
            }
        }
        return null;
    }

    static async getAllProducts() {
        const results = CatalogStorage.stickerArray.map( (x) => new CatalogItem(x.id, x.name, x.description, x.image, x.price) );
        return results;
    }

}

module.exports = CatalogStorage;

