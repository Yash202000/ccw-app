import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:location/location.dart';
import 'dart:io';

class CreatePost extends StatefulWidget {
  @override
  _CreatePostState createState() => _CreatePostState();
}

class _CreatePostState extends State<CreatePost> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _contentController = TextEditingController();
  final TextEditingController _cityController = TextEditingController();

  bool isPickingLocation = false;
  LocationData? locationData;
  File? selectedImage;

  @override
  void initState() {
    super.initState();
    getLocation();
  }

  Future<void> getLocation() async {
    final location = Location();
    bool _serviceEnabled;
    PermissionStatus _permissionGranted;

    _serviceEnabled = await location.serviceEnabled();
    if (!_serviceEnabled) {
      _serviceEnabled = await location.requestService();
      if (!_serviceEnabled) {
        return;
      }
    }

    _permissionGranted = await location.hasPermission();
    if (_permissionGranted == PermissionStatus.denied) {
      _permissionGranted = await location.requestPermission();
      if (_permissionGranted != PermissionStatus.granted) {
        return;
      }
    }

    final locationData = await location.getLocation();
    setState(() {
      this.locationData = locationData;
    });
  }

  Future<void> handleImagePicker() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        selectedImage = File(pickedFile.path);
      });
    }
  }

  void handleImageRemove() {
    setState(() {
      selectedImage = null;
    });
  }

  Future<void> handleLocationToggle() async {
    if (!isPickingLocation) {
      await getLocation();
    }
    setState(() {
      isPickingLocation = !isPickingLocation;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Post'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                'Create Post',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              TextFormField(
                controller: _titleController,
                decoration: InputDecoration(
                  labelText: 'Title',
                ),
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Title is required';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _contentController,
                decoration: InputDecoration(
                  labelText: 'Content',
                ),
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Content is required';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _cityController,
                decoration: InputDecoration(
                  labelText: 'City',
                ),
                validator: (value) {
                  if (value.isEmpty) {
                    return 'City is required';
                  }
                  return null;
                },
              ),
              SizedBox(height: 10),
              Row(
                children: <Widget>[
                  Text('Pick Location:'),
                  SizedBox(width: 10),
                  ElevatedButton(
                    onPressed: handleLocationToggle,
                    child: Text(isPickingLocation ? 'Automatic' : 'Manual'),
                  ),
                ],
              ),
              locationData != null
                  ? Text(
                      'Current Location: Latitude: ${locationData!.latitude}, Longitude: ${locationData!.longitude}',
                    )
                  : SizedBox(),
              SizedBox(height: 10),
              Row(
                children: <Widget>[
                  ElevatedButton(
                    onPressed: handleImagePicker,
                    child: Text('Pick Image'),
                  ),
                  SizedBox(width: 10),
                  ElevatedButton(
                    onPressed: handleImageRemove,
                    child: Text('Remove Image'),
                  ),
                ],
              ),
              selectedImage != null
                  ? Image.file(
                      selectedImage!,
                      height: 200,
                    )
                  : SizedBox(),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    // Submit the form and handle post creation
                    // You can access _titleController.text, _contentController.text, _cityController.text
                    // locationData, and selectedImage for your post data
                  }
                },
                child: Text('Create Post'),
              ),
              isPickingLocation
                  ? Text('Manual Location Picker Widget Goes Here')
                  : SizedBox(),
            ],
          ),
        ),
      ),
    );
  }
}

