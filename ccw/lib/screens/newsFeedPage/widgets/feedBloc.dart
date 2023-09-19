// Bloc Pattern for the feed.
// STEP-1: Imports
// STEP-2: List of Feeds
// STEP-3: Stream controller
// STEP-4: Stream sink getter
// STEP-5: Constructor - Add Likes, Listen to the changes
// STEP-6: Core functions
// STEP-7: Dispose
//Stream Is Already Been Cooked In Flutter

import 'dart:async';


class Feed {

  int feedId, type, likes;
  String username, description,  time, title, avatarImg, bannerImg, location, comments, members;

  Feed({required this.feedId,required  this.type,required  this.username,required  this.description,required, required this.time,required  this.title,required  this.avatarImg,required  this.bannerImg,required  this.location,required  this.likes,required  this.comments,required  this.members});
}


class QuestionModel {

  String question;

  QuestionModel({required this.question});
}



class Category {
  bool isSelected = false;
  String categoryType;

  Category({required this.categoryType});
}

class FeedBloc {


  List<Feed> feedList = [

    Feed(
        feedId: 1,
        type: 0,
        username: 'rohit.shetty12',
        description:
        'I have been facing a few possible symptoms of skin cancer. I have googled the possibilities but i can thought i did asked the community instead...',
        time: '1 min', // need to convert in min from backend
        title: 'What Are The Sign And Symptoms Of Skin Cancer?',//title 
        avatarImg: 'https://www.w3schools.com/w3images/avatar1.png',
        bannerImg: 'https://www.w3schools.com/w3images/avatar1.png', // no need
        location: 'Peninsula park Andheri, Mumbai', // city
        likes: 24,
        comments: '24',
        members: '24'
        ),

    Feed(
        feedId: 2,
        type: 0,
        username: 'rohit.shetty02',
        description:
        'My husband has his 3 days transpalnt assessment in Newcastle next month, strange mix of emotions. for those that have been thought this how long did it take following assessment was it intil you were t...',
        time: '10 min',
        title: '',
        avatarImg: 'https://www.w3schools.com/w3images/avatar1.png',
        bannerImg: 'https://www.w3schools.com/w3images/avatar1.png',
        location: 'Peninsula park Andheri, Mumbai',
        likes: 23,
        comments: '2',
        members: '12'),

    Feed(
        feedId: 3,
        type: 0,
        username: 'username1275',
        description: '',   
        time: '10 min',
        title: 'Cancer Meet At Rajiv Gandhi National Park',
        avatarImg: 'https://www.w3schools.com/w3images/avatar1.png',
        bannerImg: 'https://www.w3schools.com/w3images/avatar1.png',
        location: 'Peninsula park Andheri, Mumbai',
        likes: 23,
        comments: '2',
        members: '12'),

    Feed(
        feedId: 4,
        type: 0,
        username: 'super987',
        description: '#itsokeyto #cancerserviver',  
        time: '10 min',
        title: 'Something To Motivate You',
        avatarImg: 'https://www.w3schools.com/w3images/avatar4.png',
        bannerImg: 'https://www.w3schools.com/w3images/avatar4.png',
        location: 'Peninsula park Andheri, Mumbai',
        likes: 25,
        comments: '24',
        members: '18'),

    Feed(
        feedId: 5,
        type: 0,
        username: 'username1275',
        description: '#itsokeyto #cancerserviver',
        time: '1 min',
        title: 'What is the best hospital in india for the cancer?',
        avatarImg: 'https://www.w3schools.com/w3images/avatar4.png',
        bannerImg: 'https://www.w3schools.com/w3images/avatar4.png',
        location: 'Peninsula park Andheri, Mumbai',
        likes: 25,
        comments: '24',
        members: '18'),
  ];


  // 2. Stream controller
  final _feedListStreamController = StreamController<List<Feed>>();
  final _feedLikeIncrementController = StreamController<Feed>();
  final _feedLikeDecrementController = StreamController<Feed>();

  // 3. Stream Sink Getter
  Stream<List<Feed>> get feedListStream => _feedListStreamController.stream;
  StreamSink<List<Feed>> get feedListSink => _feedListStreamController.sink;

  StreamSink<Feed> get feedLikeIncrement => _feedLikeIncrementController.sink;
  StreamSink<Feed> get feedLikeDecrement => _feedLikeDecrementController.sink;

  // Constructor




  FeedBloc()
  {
    _feedListStreamController.add(feedList);
    _feedLikeIncrementController.stream.listen(_incrementLike);
    _feedLikeDecrementController.stream.listen(_decrementLike);
  }

  _incrementLike(Feed feed)
  {
    int like = feed.likes;
    int incrementLike = like + 1;
    feedList[feed.feedId - 1].likes = like + incrementLike;
    feedListSink.add(feedList);
  }

  _decrementLike(Feed feed)
  {
    int like = feed.likes;
    int decrementLike = like - 1;
    feedList[feed.feedId - 1].likes = like - decrementLike;
    feedListSink.add(feedList);
  }

  dispose()
  {
    _feedLikeDecrementController.close();
    _feedLikeIncrementController.close();
    _feedListStreamController.close();
  }
}
