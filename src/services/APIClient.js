 import firebase from 'firebase'

 const firebaseConfig = {
   apiKey: process.env.apiKey || ""
   authDomain: process.env.authDomain || '',
   databaseURL: process.env.databaseURL || '',
   projectId: process.env.projectId || 'build-week5-1751e',
   storageBucket: process.env.storageBucket || '',
   messagingSenderId: process.env.messagingSenderId || '',
   appId: process.env.appId || '',
   measurementId: process.env.measurementId || ''
 };

 firebase.initializeApp(firebaseConfig)

 const db = firebase.firestore()

 export const getBlogs = async () => {
   const querySnapshot = await db.collection("blogs").get()
   const data = []
   querySnapshot.forEach((doc) => {
     data.push({ id: doc.id, ...doc.data() })
   })
   return data.sort((a,b)=>{if (a.created > b.created)return -1; return 1})
 }

 export const createBlog = (blog) => db.collection("blogs").add(blog)

 export const deleteBlog = (blogId) => db.collection('blogs').doc(blogId).delete()


class APIClient {
  constructor() {
    this.blogs = [
      {title:"おはようございます。",body:"今日もいい天気ですね。",created:new Date(),userName:"system"},
      ];
    this.skills = [
      "Django",
      "Python",
      "法学",
      "営業スキル",
    ]
  }

  getSkills(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.skills);
      }, 1000);
    });

  }

  getBlogs() {
    return getBlogs();
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(this.blogs);
    //   }, 1000);
    // });
  }

  createBlog(blog) {
    return createBlog(blog)
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     this.blogs.push(blog);
    //     resolve();
    //   }, 1000);
    // });
  }

  deleteBlog(id) {
    deleteBlog(id)
  }
}

export default APIClient;


