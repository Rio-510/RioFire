import APIClient from '../services/APIClient';
import './dom.css';
import './rio.css';

class SkillList {
  constructor() {
    this.list = document.querySelector('#skill-list ul');
    this.APIClient = new APIClient();
    this.render();
  }

  async render() {
    const skills = await this.APIClient.getSkills();
    let lis = '';
    console.log(skills)
    skills.forEach((skill) => lis += `<li><span class="name">${skill}</span>`);
    this.list.innerHTML = lis;
  }

}
class BlogList {
  constructor() {
    this.list = document.querySelector('#blog-list ul');
    this.form = document.forms['add-blog'];
    this.addInput = document.forms['add-blog'].querySelector('input[type="text"]');
    this.hideBox = document.querySelector('#hide');
    this.searchBar = document.forms['search-blogs'].querySelector('input');
    this.APIClient = new APIClient();
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.list.addEventListener('click', this.onDeleteButtonClick.bind(this));
    this.form.addEventListener('submit', this.onSubmit.bind(this));
    this.hideBox.addEventListener('change', this.onHideBoxChange.bind(this));
    this.searchBar.addEventListener('keyup', this.onSearchBarChange.bind(this));
  }

  onDeleteButtonClick(e) {
    if (e.target.className == 'delete') {
      const blog = e.target.previousSibling.innerText;
      this.APIClient.deleteBlog(blog);
      this.render();
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    const { value } = this.addInput;
    await this.APIClient.createBlog({title:value,body:"#TODO",created:new Date()});
    this.render();
  }

  onHideBoxChange(e) {
    if (this.hideBox.checked) {
      this.list.style.display = 'none';
    } else {
      this.list.style.display = 'initial';
    }
  }

  onSearchBarChange(e) {
    const term = e.target.value.toLowerCase();
    const blogs = this.list.getElementsByTagName('li');
    Array.from(blogs).forEach((blog) => {
      const title = blog.firstElementChild.textContent;
      if (title.toLowerCase().indexOf(e.target.value) != -1) {
        blog.style.display = 'block';
      } else {
        blog.style.display = 'none';
      }
    });
  }

  async render() {
    const blogs = await this.APIClient.getBlogs();
    let lis = '';
    blogs.forEach((blog) => lis += `<li><span class="name">${blog.title}</span>
   <div> ${blog.body}</div> <span>${blog.created}</span><span class="delete">delete</span></li>`);
    this.list.innerHTML = lis;
  }
}

const blogList = new BlogList();
const skillList = new SkillList();