class User{
    /*
    id;
    infoUser;

    choices,
    myLunches,
    dateChoice,
    */
    constructor(id, infoUser){
        this.id = id;
        this.infoUser = infoUser;
        this.choices = [-1,-1,-1];
        this.myLunches = [];
        this.dateChoice = -1;
    }
}

class Restaurant{
    /*
    var id;
    var infoRestaurant;
    */
    constructor(id, infoRestaurant){
        this.id = id;
        this.infoRestaurant = infoRestaurant;
    }
}

class Lunch{
    /*
    var name;
    var id;
    var admin;
    var users;
    var restaurants;
    */
    constructor(id, name, userId, restaurants, users){
        this.name = name;
        this.id = id;
        this.admin = userId;
        this.restaurants = restaurants;
        this.users = users;
    }
}

class Database{
    /*
    var users;
    var restaurants;
    var lunches;
        */
    constructor(users, restaurants, lunches){
        this.users = users;
        this.restaurants = restaurants;
        this.lunches = lunches;
    }

    getUserById(id){
        for(var i=0; i<users.length; i++){
            if(users[i].id == id){
                return users[i];
            }
        }
        return null;
    }

    getUserByName(name){
        for(var i=0; i<users.length; i++){
            if(users[i].infoUser.name == name){
                return users[i];
            }
        }
        return null;
    }

    getLunchById(id){
        for(var i=0; i<lunches.length; i++){
            if(lunches[i].id == id){
                return lunches[i];
            }
        }
        return null;
    }

    getRestaurantById(id){
        for(var i=0; i<restaurants.length; i++){
            if(restaurants[i].id == id){
                return restaurants[i];
            }
        }
        return null;
    }

    getUserPageInfo(id){
        var userPageInfo = this.getUserById(id);
        for(var i=0; i<userPageInfo.myLunches.length; i++){
            console.log(JSON.stringify(userPageInfo));
            userPageInfo.myLunches[i]={id:userPageInfo.myLunches[i], name:this.getLunchById(userPageInfo.myLunches[i]).name};
        }
        for(var i=0; i<userPageInfo.choices.length; i++){
            userPageInfo.choices[i]=this.getRestaurantById(userPageInfo.choices[i]);
        }
        return userPageInfo;
    }

    getLunchPageInfo(id){
        var lunchPageInfo = getLunch(id);
        lunchPageInfo.admin = getUserById(lunchPageInfo.admin).name;
        for(var i=0; i<lunchPageInfo.users.length; i++){
            lunchPageInfo.users[i]=getUserById(lunchPageInfo.users[i].id).infoUser;
        }
        for(var i=0; i<lunchPageInfo.restaurants.length; i++){
            lunchPageInfo.restaurants[i]={id:lunchPageInfo.restaurants[i].id, info:getRestaurantById(userPageInfo.restaurants[i].id).infoRestaurant};
        }
        return lunchPageInfo;
    }

    setUser(user){
        for(var i=0; i<users.length; i++){
            if(users[i].id == user.id){
                users[i] = user;
            }
        }
    }

    setLunch(lunch){
        for(var i=0; i<lunches.length; i++){
            if(lunches[i].id == lunch.id){
                lunches[i] = lunch;
            }
        }
    }

    addNewUser(name, password){
        this.users.push(new User(users.length, {name:name, password:password}));
    }
}

var users =
[
    {
        id:0,
        infoUser:
        {
            name:"Elias",
            password:"pwd"
        },
        choices:[0,2,-1],
        myLunches:[0,1,2,3],
        dateChoice:-1
    },
    {
        id:1,
        infoUser:
        {
            name:"Erwan",
            password:"pwd"
        },
        choices:[-1,-1,-1],
        myLunches:[0,1,2,3],
        dateChoice:-1
    },
    {
        id:2,
        infoUser:
        {
            name:"Oier",
            password:"pwd"
        },
        choices:[1,-1,-1],
        myLunches:[0,1],
        dateChoice:-1
    },
    {
        id:3,
        infoUser:
        {
            name:"JMS",
            password:"pwd"
        },
        choices:[3,0,2],
        myLunches:[1,3],
        dateChoice:-1
    }
];

var restaurants =
[
    {
        id:0,
        infoRestaurant:
        {
            name:"McDonalds",
            img:
            [
                "https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-5.jpg"
            ]
        }
    },
    {
        id:1,
        infoRestaurant:
        {
            name:"Burger King",
            img:
            [
                "https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-6.jpg"
            ]
        }
    },
    {
        id:2,
        infoRestaurant:
        {
            name:"O'Tacos",
            img:
            [
                "https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-7.jpg"
            ]
        }
    },
    {
        id:3,
        infoRestaurant:
        {
            name:"Kebab World",
            img:
            [
                "https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-8.jpg"
            ]
        }
    }
];

var lunches =
[
    {
        name:"midi PSA",
        id:0,
        admin:0,
        users:[0,1,2],
        restaurants:[0,3]
    },
    {
        name:"midi Segula",
        id:1,
        admin:2,
        users:[0,1,2,3],
        restaurants:[0,1,2,3]
    },
    {
        name:"AfterWork",
        id:2,
        admin:1,
        users:[0,1],
        restaurants:[1,2]
    },
    {
        name:"Soirée JMS",
        id:3,
        admin:3,
        users:[0,1,3],
        restaurants:[0,1,2]
    }

];

exports.getDatabase = () => new Database(users, restaurants,lunches);
