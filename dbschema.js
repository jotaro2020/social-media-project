let db = {
  users:[
    {
      userId:'hdkjas3kjehd9h23',
      email:'user@email.com',
      handle:'user',
      createdAt:'2019-03-15T10:59:42.798Z',
      imageUrl:'image/dkljaslkdjsak/kdjaslkdjlas',
      bio:'Hello, my name is user, nice to meet you',
      website:'http://user.com',
      location:'London,UK'
    }
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2020-09-30T06:48:18.472Z",
      likeCount: 5,
      commentCount: 2,
    },
  ],
   comments: [
  {
      userHandle: "user",
      screamId: 'daskjk12jdk',
      body:'nice one mate',
      createdAt: '2020-09-30T06:48:18.472Z',
  }
  ],
  notifications:[
    {
      recipient: 'user',
      sender:'john',
      read:'true | false',
      screamId:'dkljklasjdsa',
      type:'like|comment',
      createdAt: '2020-09-30T06:48:18.472Z',
    }
  ]
};
const userDetail={
    //Redux data
  credentials:{
    userId:'kdjaslkdjlaskdjlkasd',
    email:'user@email.com',
    handle: 'user',
    createdAt: '2020-09-30T06:48:18.472Z',
    imageUrl:'image/dkljaslkdjsak/kdjaslkd',
    bio:'hello my name is user, nice to meet you',
    website:'https://user.com',
    location:'London,UK'
  },
  likes:[
    {
      userHandle:'user',
      screamId:'dasdsadasgkjsd12',
    },
    {
      userHandle: 'user',
      screamId: '9821ujdask21'
    }
  ],
}