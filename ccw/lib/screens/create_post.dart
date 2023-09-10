import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ccw/components/components.dart';
import 'package:ccw/screens/welcome.dart';
import 'package:ccw/consts/env.dart' show backendUrl;
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';


class CreatePostWidget extends StatefulWidget {
  static String id = 'create_post_screen';
  
  @override
  _CreatePostWidgetState createState() => _CreatePostWidgetState();
}

class _CreatePostWidgetState extends State<CreatePostWidget> {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController contentController = TextEditingController();
  final TextEditingController fileController = TextEditingController();
  final TextEditingController cityController = TextEditingController();
  final TextEditingController latitudeController = TextEditingController();
  final TextEditingController longitudeController = TextEditingController();
  final TextEditingController authorIdController = TextEditingController();

  bool? published = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Post'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextFormField(
              controller: titleController,
              decoration: InputDecoration(labelText: 'Title'),
            ),
            TextFormField(
              controller: contentController,
              decoration: InputDecoration(labelText: 'Content'),
            ),
           ElevatedButton(
              onPressed: () async {
                FilePickerResult? result = await FilePicker.platform.pickFiles();

                if (result != null) {
                  final PlatformFile file = result.files.single;
                  
                  // Check if the file is not empty
                  if (file.bytes != null && file.bytes!.isNotEmpty) {
                    // Handle the selected file data and update 'fileController.text'
                    setState(() {
                      // You can access file.bytes to get the file's data as a list of bytes
                      // For example, you can convert it to base64 if needed
                      final base64Data = base64Encode(file.bytes!);
                      fileController.text = base64Data;
                    });
                  }
                }
              },
              child: Text('Select File'),
            ),
            TextFormField(
              controller: fileController,
              decoration: InputDecoration(labelText: 'File'),
            ),

            TextFormField(
              controller: cityController,
              decoration: InputDecoration(labelText: 'City'),
            ),
            CheckboxListTile(
              title: Text('Published'),
              value: published ?? false,
              onChanged: (value) {
                setState(() {
                  published = value;
                });
              },
            ),
            TextFormField(
              controller: latitudeController,
              decoration: InputDecoration(labelText: 'Latitude'),
            ),
            TextFormField(
              controller: longitudeController,
              decoration: InputDecoration(labelText: 'Longitude'),
            ),
            TextFormField(
              controller: authorIdController,
              decoration: InputDecoration(labelText: 'Author ID'),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Handle form submission and send the POST request here
                _sendPostRequest();
              },
              child: Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }

 void _sendPostRequest() async {

  debugPrint('inside of _sendPostRequest!');

  try {
    final url = Uri.parse('$backendUrl/api/post'); // Replace with your API URL

    var request = http.MultipartRequest('POST', url);

    // Add text fields to the request
    request.fields['title'] = titleController.text;
    request.fields['content'] = contentController.text;
    request.fields['city'] = cityController.text;
    request.fields['published'] = published.toString(); // Convert bool to string
    request.fields['latitude'] = latitudeController.text;
    request.fields['longitude'] = longitudeController.text;
    request.fields['authorId'] = authorIdController.text;

    debugPrint('after set input');
    // Handle file upload
    if (fileController.text.isNotEmpty) {
      final filePath = fileController.text;
      var file = await http.MultipartFile.fromPath('file', filePath);
      debugPrint('inside of the filecontroller ');
      request.files.add(file);
    }

    // Send the request and get the response
    var response = await request.send();

     if (response.statusCode == 201) {
        signUpAlert(
          context: context,
          title: 'Post Created!',
          desc: 'Go Home page now',
          btnText: 'Take me there',
          onPressed: () {
            
            Navigator.popAndPushNamed(
                  context, CreatePostWidget.id);
            
            Navigator.pushNamed(
                context, WelcomeScreen.id);
          },
        ).show();
      }
    } catch (e) {
      signUpAlert(
          context: context,
          onPressed: () {
           Navigator.popAndPushNamed(
                  context, CreatePostWidget.id);
            
            Navigator.pushNamed(
                context, WelcomeScreen.id);
          },
          title: 'SOMETHING WRONG',
          desc: 'Close the app and try again',
          btnText: 'Close Now');
    }

    // if (response.statusCode == 201) {
    //   // Handle a successful response

    //   Navigator.popAndPushNamed(context, CreatePostWidget.id);
    //   Navigator.pushNamed(context, WelcomeScreen.id);
    //   print('Post created successfully');
    // } else {
    //   // Handle an error response
    //   print('Failed to create post');
    // }
  }

  @override
  void dispose() {
    titleController.dispose();
    contentController.dispose();
    fileController.dispose();
    cityController.dispose();
    latitudeController.dispose();
    longitudeController.dispose();
    authorIdController.dispose();
    super.dispose();
  }
}
