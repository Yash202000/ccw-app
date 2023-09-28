import 'package:flutter/material.dart';
import 'package:ccw/screens/postpage/postdetail_page.dart';
import 'package:ccw/screens/newsFeedPage/widgets/category_list.dart';
import 'package:ccw/screens/newsFeedPage/widgets/feedBloc.dart';
import 'package:ccw/screens/newsFeedPage/widgets/widgetFeed.dart';
import 'package:ccw/screens/newsFeedPage/FeedLatestArticle.dart';
import 'package:http/http.dart' as http;
import 'package:ccw/consts/env.dart' show backendUrl;
import 'dart:convert';

class NewsFeed extends StatefulWidget {

  @override
  _NewsFeedState createState() => _NewsFeedState();
}

class _NewsFeedState extends State<NewsFeed> {

  List feedList = [];
  bool isVisible = false;

  @override
  void initState() {
    super.initState();
    // Call the routing function when the widget is initialized
    _getPosts();
  }

  Future<void> _getPosts() async {
    var url = Uri.parse('$backendUrl/api/post/filtered-posts');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonResponse = jsonDecode(response.body);
      final content = jsonResponse['content'];

      setState(() {
        feedList = content.map((json) {
          return GptFeed.fromJson(json);
        }).toList();

        isVisible = true;
      });
    }
  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: actionBarRow(context),
        centerTitle: false,
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
      ),

      body: SafeArea(
        child: Column(
          children: <Widget>[
            Container(
              margin: EdgeInsets.all(10),
              child: Column(
                children: <Widget>[
                  topSpace(),
                  searchTextField(),
                  topSpace(),
                  Container(height: 55, child: CategoryList()),
                ],
              ),
            ),
            Expanded(
              child: Container(
                color: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 10),

                child: SingleChildScrollView(

                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      // List section for the News Feed.
                      GestureDetector(
                        // onTap: viewDetailPage,
                        child:
                            feedNewsCardItem(context, feedList[0]),
                      ),

                      topSpace(),
                      GestureDetector(
                        // onTap: viewDetailPage,
                        child:
                            feedNewsCardItem(context, feedList[1]),
                      ),

                      // topSpace(),
                      // GestureDetector(
                      //   onTap: viewDetailPage,
                      //   child: feedNewsCardItemQuestion(
                      //       context, FeedBloc().feedList[2]),
                      // ),

                      // topSpace(),
                      // GestureDetector(
                      //   onTap: viewDetailPage,
                      //   child: feedNewsCardWithImageItem(
                      //       context, FeedBloc().feedList[3]),
                      // ),

                      // SizedBox(height: 20),

                      // Container(
                      //     padding: EdgeInsets.symmetric(horizontal: 10),
                      //     child: Text('LATEST ARTICLE',
                      //         style: TextStyle(
                      //             fontSize: 16, fontWeight: FontWeight.bold))),

                      // topSpace(),

                      // Container(
                      //     height: 200,
                      //     padding: EdgeInsets.all(10),
                      //     child: LatestArticle()),

                      // topSpace(),
                      // pollingCard(context, FeedBloc().feedList[4]),

                      // topSpace(),
                      // GestureDetector(
                      //   onTap: viewDetailPage,
                      //   child: feedNewsCardItem(context, FeedBloc().feedList[1]),
                      // ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Widget? viewDetailPage() {
  //   print('Go To Detail Screen');
  //   Navigator.push(context,
  //        MaterialPageRoute(builder: (context) => PostPageDetails()));
  //   return null;
  // }
}
