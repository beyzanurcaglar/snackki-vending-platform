class User {
  int? id;
  int? userId;
  String? name;
  String? surname;
  String? phone;
  String? street;
  int? postNo;
  int? isAdmin;
  String? city;
  String? email;
  String? companyName;

  User({
    this.id,
    this.userId,
    this.name,
    this.surname,
    this.phone,
    this.street,
    this.postNo,
    this.isAdmin,
    this.city,
    this.email,
    this.companyName,
  });

  User.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['userId'];
    name = json['name'];
    surname = json['surname'];
    phone = json['phone'];
    street = json['street'];
    postNo = json['postNo'];
    isAdmin = json['isAdmin'];
    city = json['city'];
    email = json['email'];
    companyName = json['companyName'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['userId'] = userId;
    data['name'] = name;
    data['surname'] = surname;
    data['phone'] = phone;
    data['street'] = street;
    data['postNo'] = postNo;
    data['isAdmin'] = isAdmin;
    data['city'] = city;
    data['email'] = email;
    data['companyName'] = companyName;

    return data;
  }
}
