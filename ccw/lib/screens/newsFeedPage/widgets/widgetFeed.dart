import 'package:ccw/screens/newsFeedPage/widgets/feedBloc.dart';
import 'package:ccw/screens/newsFeedPage/widgets/feedCard.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:ccw/screens/profile/edit_profile.dart';


Widget actionBarRow(BuildContext context) {return Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    crossAxisAlignment: CrossAxisAlignment.center,
    children: <Widget>[
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text('COMMUNITY',
              style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.normal,
                  color: Colors.grey)),
          Row(
            children: <Widget>[
              Text('All Communities',
                  style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.teal)),
              SizedBox(width: 6),
              Icon(
                Icons.arrow_drop_down,
                color: Colors.teal,
              )
            ],
          )
        ],
      ),
      
      GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => EditProfileWidget()),
          );
        },
        child: CircleAvatar(
          child: ClipOval(child: Image.network('https://www.w3schools.com/w3images/avatar3.png')),
          radius: 20,
          backgroundColor: Colors.grey,
        ),
      )

    ],
  );}

Widget searchTextField() {
  return Row(
    mainAxisAlignment: MainAxisAlignment.end,
    children: <Widget>[
      Expanded(
        child: TextField(
          maxLines: 1,
          decoration: new InputDecoration(
            suffixIcon: Icon(CupertinoIcons.search),
            contentPadding: EdgeInsets.all(12),
            hintText: 'Search posts and members',
            border: OutlineInputBorder(
              borderRadius: const BorderRadius.all(
                Radius.circular(4.0),
              ),
              borderSide:  BorderSide(color: (Colors.grey[300])!, width: 0.5),
            ),
          ),
        ),
      ),
      Container(
        margin: EdgeInsets.all(15),
        child: Icon(FontAwesomeIcons.bell, size: 26),
      )
    ],
  );
}

BoxDecoration boxDecoration() {
  return BoxDecoration(
      borderRadius: BorderRadius.all(Radius.circular(30)),
      border:
          Border.all(width: 1, style: BorderStyle.solid, color: Colors.teal));
}

BoxDecoration selectedBoxDecoration() {
  return BoxDecoration(
      borderRadius: BorderRadius.all(Radius.circular(30)),
      color: Colors.teal[200],
      border:
          Border.all(width: 1, style: BorderStyle.solid, color: Colors.teal));
}

Widget topSpace() {
  return SizedBox(height: 10);
}

Widget feedNewsCardItem(BuildContext context, GptFeed feed) {
  return Container(
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
            renderCategoryTime(feed),
            space10(),
            userAvatarSection(context, feed),
            space15(),
            Visibility(
                visible: feed.title.isEmpty == true ? false : true,
                child: Text(feed.title,
                    softWrap: true,
                    maxLines: 2,
                    style:
                    TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
            space15(),
            Visibility(
                visible: feed.content.isEmpty == true ? false : true,
                child: Text(feed.content,
                    style: TextStyle(fontSize: 14, color: Colors.grey))),
            space15(),
            setLocation(feed),
            Divider(thickness: 1),
            Row(
              children: <Widget>[
                Icon(FontAwesomeIcons.addressBook),
                SizedBox(width: 10),
                Text(
                  '${feed.count.upvotes} Members supported the post',
                  style: TextStyle(
                      fontSize: 14, color: Theme.of(context).primaryColor),
                ),
              ],
            ),
            Divider(thickness: 1),
            SizedBox(height: 10),
            likeCommentShare(context,feed),
            space15(),
          ],
        ),
      ),
    ),
  );
}

Widget feedNewsCardItemQuestion(BuildContext context, GptFeed feed) {
  return Container(
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
            renderCategoryTime(feed),
            space10(),
            userAvatarSection(context, feed),
            space15(),
            Visibility(
                visible: feed.title.isEmpty == true ? false : true,
                child: Text(feed.title,
                    softWrap: true,
                    maxLines: 2,
                    style:
                    TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
            space15(),
            setLocation(feed),
            space15(),
            questionPallet(),
            space15(),
            Divider(thickness: 1),
            Row(
              children: <Widget>[
                Icon(FontAwesomeIcons.addressBook),
                SizedBox(width: 10),
                Text(
                  '${feed.count.upvotes} Members supported the post',
                  style: TextStyle(
                      fontSize: 14, color: Theme.of(context).primaryColor),
                ),
              ],
            ),
            Divider(thickness: 1),
            SizedBox(height: 10),
            likeCommentShare(context,feed),
            space15(),
          ],
        ),
      ),
    ),
  );
}

//important card code to render

Widget feedNewsCardWithImageItem(BuildContext context,GptFeed feed) {
  return Container(
    decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(8)),
        border: Border.all(style: BorderStyle.solid, color: Colors.grey, width: 0.5)
    ),
    child: Card(
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            renderCategoryTime(feed),
            space10(),
            userAvatarSection(context, feed),
            space15(),
            Text(feed.title,
                softWrap: true,
                maxLines: 2,
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            space15(),
            Text(feed.content,
                style: TextStyle(fontSize: 14, color: Colors.blue)),
            space15(),
            // show Image Preview

            Image.asset('assets/images/running_girl.jpeg', fit: BoxFit.cover, height: 180, width: double.infinity),

            space15(),
            // shows location
            setLocation(feed),
            Divider(thickness: 1),
            Row(
              children: <Widget>[
                Icon(FontAwesomeIcons.addressBook),
                SizedBox(width: 10),
                Text(
                  '${feed.count.upvotes} Members supported the post',
                  style: TextStyle(
                      fontSize: 14, color: Theme.of(context).primaryColor),
                ),
              ],
            ),
            Divider(thickness: 1),
            SizedBox(height: 10),
            likeCommentShare(context,feed),
            space15(),
          ],
        ),
      ),
    ),
  );
}

Widget btnDecoration(String btnText) {
  return Container(
      padding: EdgeInsets.symmetric(vertical: 5, horizontal: 20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(20)),
        color: Colors.teal,
      ),
      child: Text(
        btnText,
        style: TextStyle(fontSize: 12, color: Colors.grey[100]),
      ));
}

Widget questionPallet() {
  return Container(
    padding: EdgeInsets.symmetric(horizontal: 20),
    height: 100,
    decoration: BoxDecoration(color: Colors.teal[100]),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('Are you going?', style: TextStyle(fontSize: 18)),
            Row(
              children: <Widget>[
                Icon(Icons.people),
                SizedBox(
                  width: 4,
                ),
                Text('21 People going?', style: TextStyle(fontSize: 12))
              ],
            )
          ],
        ),
        Row(
          children: <Widget>[
            btnDecoration('No'),
            SizedBox(width: 20),
            btnDecoration('Yes')
          ],
        )
      ],
    ),
  );
}

Widget pollingCard(BuildContext context,GptFeed feed) {
  return Container(
    decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(8)),
        border: Border.all(style: BorderStyle.solid, color: Colors.grey, width: 0.5)
    ),
    child: Card(
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            renderCategoryTime(feed),
            space10(),
            userAvatarSection(context, feed),
            space15(),
            Visibility(
                visible: feed.title.isEmpty == true ? false : true,
                child: Text(feed.title,
                    softWrap: true,
                    maxLines: 2,
                    style:
                    TextStyle(fontSize: 16, fontWeight: FontWeight.bold))),
            space15(),
            pollCartSection(),
            space15(),
            setLocation(feed),
            Divider(thickness: 1),
            Row(
              children: <Widget>[
                Icon(FontAwesomeIcons.addressBook),
                SizedBox(width: 10),
                Text(
                  'You and ${feed.count.upvotes} Members Liked this poll',
                  style: TextStyle(
                      fontSize: 14, color: Theme.of(context).primaryColor),
                ),
              ],
            ),
            Divider(thickness: 1),
            SizedBox(height: 10),
            likeCommentShare(context,feed),
            space15(),
          ],
        ),
      ),
    ),
  );
}

Widget pollCartSection() {
  return Column(
    children: <Widget>[
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          pollQuestion('Apollo Hospital, Banglore'),
          pollQuestion('20%'),
        ],
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          pollQuestion('AIIMS Delhi'),
          pollQuestion('20%'),
        ],
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          pollQuestion('Kokila Ben Dhirubhai Ambani, Mumbai'),
          pollQuestion('50%')
        ],
      )
    ],
  );
}

Widget pollQuestion(String question) {
  return Container(
    padding: EdgeInsets.all(10),
    decoration:
    BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(8))),
    child: Text(question),
  );
}