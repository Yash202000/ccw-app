import 'package:flutter/material.dart';

class HelpAndSupport extends StatefulWidget {
    static String id = 'help_screen';
  @override
  _HelpAndSupportState createState() => _HelpAndSupportState();
}

class _HelpAndSupportState extends State<HelpAndSupport> {
  List<Item> _data = generateItems(3);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Help and Support'),
      ),
      body: ListView(
        children: _data.map<Widget>((Item item) {
          return Container(
            margin: EdgeInsets.all(8.0),
            child: Card(
              child: ExpansionPanelList(
                elevation: 1,
                expandedHeaderPadding: EdgeInsets.all(0),
                expansionCallback: (int index, bool isExpanded) {
                  setState(() {
                    item.isExpanded = !isExpanded;
                  });
                },
                children: [
                  ExpansionPanel(
                    headerBuilder: (BuildContext context, bool isExpanded) {
                      return ListTile(
                        title: Text(item.question),
                      );
                    },
                    body: ListTile(
                      title: Text(item.answer),
                    ),
                    isExpanded: item.isExpanded,
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}

class Item {
  Item({
    required this.question,
    required this.answer,
  });

  final String question;
  final String answer;
  bool isExpanded = false;
}

List<Item> generateItems(int numberOfItems) {
  return List<Item>.generate(numberOfItems, (int index) {
    return Item(
      question: 'Question ${index + 1}',
      answer: 'Answer to question ${index + 1}',
    );
  });
}


