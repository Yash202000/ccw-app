import 'package:flutter/material.dart';
import 'package:ccw/screens/postpage/widgets.dart';
import 'package:ccw/screens/newsFeedPage/widgets/feedBloc.dart';
import 'package:ccw/screens/newsFeedPage/widgets/widgetFeed.dart';
import 'package:ccw/screens/newsFeedPage/widgets/feedCard.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:ccw/screens/newsFeedPage/widgets/ThumsUpReactions.dart';

class PostPageDetails extends StatefulWidget {
   final GptFeed feed;

  PostPageDetails({required this.feed});

  @override
  _PostPageDetailsState createState() => _PostPageDetailsState();
}

class _PostPageDetailsState extends State<PostPageDetails> {
  @override

  Widget build(BuildContext context) {
    Widget _buildMessageComposer() {

      final GptFeed feed = widget.feed;
      print(feed.id);

      return Container(
        padding: EdgeInsets.symmetric(horizontal: 8.0),
        height: 70.0,
        color: Colors.white,
        child: Row(
          children: <Widget>[
            IconButton(
              icon: Icon(Icons.photo),
              iconSize: 25.0,
              color: Theme.of(context).primaryColor,
              onPressed: () {},
            ),
            Expanded(
                child: TextField(
              textCapitalization: TextCapitalization.sentences,
              onChanged: (value) {},
              decoration:
                  InputDecoration.collapsed(hintText: 'Add a cheerful comment'),
            )),
            IconButton(
              icon: Icon(Icons.send),
              iconSize: 25.0,
              color: Theme.of(context).primaryColor,
              onPressed: () {},
            ),
          ],
        ),
      );
    }

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('Questions'),
        elevation: 0,
        backgroundColor: Colors.white,
      ),
      body: SafeArea(
        child: GestureDetector(
          onTap: FocusScope.of(context).unfocus,
          child: SingleChildScrollView(
            padding: EdgeInsets.all(10),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[

                // feedNewsCardItem(context,widget.feed),
                Container(
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(8)),
                      border: Border.all(style: BorderStyle.solid, color: Colors.grey, width: 0.5)
                  ),
                  child: Card(
                    elevation: 0,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        children: <Widget>[
                          renderCategoryTime(widget.feed),
                          space10(),
                          userAvatarSection(context, widget.feed),
                          space15(),
                          Visibility(
                              visible: widget.feed.title.isEmpty == true ? false : true,
                              child: Text(widget.feed.title,
                                  softWrap: true,
                                  maxLines: 2,
                                  style:
                                  TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
                          space15(),
                          Visibility(
                              visible: widget.feed.content.isEmpty == true ? false : true,
                              child: Text(widget.feed.content,
                                  style: TextStyle(fontSize: 14, color: Colors.grey))),
                          space15(),
                          setLocation(widget.feed),
                          Divider(thickness: 1),
                          Row(
                            children: <Widget>[
                              Icon(FontAwesomeIcons.addressBook),
                              SizedBox(width: 10),
                              Text(
                                '${widget.feed.count.upvotes} Members supported the post',
                                style: TextStyle(
                                    fontSize: 14, color: Theme.of(context).primaryColor),
                              ),
                            ],
                          ),
                          Divider(thickness: 1),
                          SizedBox(height: 10),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: <Widget>[
                              GestureDetector(
                                  onTap: () {
                                    print('FB Reactions Tapped');
                                    FbReactionBox();
                                  },
                                  child: Row(
                                    children: <Widget>[
                                      Icon(
                                        FontAwesomeIcons.thumbsUp,
                                        size: 18,
                                      ),
                                      SizedBox(width: 5),
                                      Text('${widget.feed.count.upvotes}')
                                    ],
                                  )),
                              Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: <Widget>[
                                    GestureDetector(
                                        onTap: () =>print("comment section printed..")
                                          ,
                                        child: Row(
                                          children: <Widget>[
                                            Icon(FontAwesomeIcons.comment, size: 18),
                                            SizedBox(width: 5),
                                            Text('${widget.feed.count.comments}')
                                          ],
                                        ))
                                  ]),
                              Icon(FontAwesomeIcons.bookmark, size: 18),
                              GestureDetector(
                                  onTap: () {
                                    print('share code');
                                  },
                                  child: Icon(FontAwesomeIcons.shareAlt, size: 18))
                            ],
                          ),
                          space15(),
                        ],
                      ),
                    ),
                  ),
                ),

                //Reply and comment 1
                SizedBox(height: 30),
                othersComment(context, FeedBloc().feedList[2]),

                //Reply and comment 1
                SizedBox(height: 30),
                othersCommentWithImageSlider(context, FeedBloc().feedList[2]),

                //Reply and comment 1
                SizedBox(height: 30),
                othersComment(context, FeedBloc().feedList[2]),

                SizedBox(height: 30),
                othersComment(context, FeedBloc().feedList[2]),

                SizedBox(height: 30),
                commentReply(context, FeedBloc().feedList[2]),

                SizedBox(height: 30),
                othersComment(context, FeedBloc().feedList[2]),

                SizedBox(height: 30),
                othersCommentWithImageSlider(context, FeedBloc().feedList[2]),

                SizedBox(height: 30),
                othersComment(context, FeedBloc().feedList[2]),

                _buildMessageComposer()
              ],
            ),
          ),
        ),
      ),
    );
  }
}
