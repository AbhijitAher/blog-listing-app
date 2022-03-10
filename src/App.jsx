import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
	// ---------- States --------------------
	let [blogs, setBlogs] = useState([]);
	let [title, setTitle] = useState("");
	let [writer, setWriter] = useState("");
	let [imgURL, setImgURL] = useState("");

	useEffect(() => {
		let localBlogs = localStorage.getItem("blogs");
		if (localBlogs) {
			let prevBlogs = JSON.parse(localBlogs);
			setBlogs(prevBlogs);
		}
	}, []);

	// ----------- Change Handlers -----------
	const HandleWriterChange = (e) => {
		setWriter(e.target.value);
	};
	const HandleTitleChange = (e) => {
		setTitle(e.target.value);
	};
	const HandleImgURLChange = (e) => {
		setImgURL(e.target.value);
	};
	const HandleSubmit = () => {
		let obj = {
			title: title,
			writer: writer,
			imgURL: imgURL,
			time: new Date().toLocaleString(),
		};

		// adding the new blog to all previous blogs
		let newBlogs = [obj, ...blogs];
		setBlogs(newBlogs);

		// updating the LocalStorage
		let localBlogs = JSON.stringify(blogs);
		localStorage.setItem("blogs", localBlogs);
	};
	return (
		<div className="App">
			<h1>Blog Listing</h1>
			<div>
				<input type="text" onChange={HandleTitleChange} placeholder="Title" />{" "}
				<br />
				<input
					type="text"
					onChange={HandleImgURLChange}
					placeholder="Image URL for blog"
				/>{" "}
				<br />
				<input type="text" onChange={HandleWriterChange} placeholder="Writer" />
				<br />
				<button onClick={HandleSubmit}>Add</button>
			</div>
			<div>
				{blogs.map((el) => {
					return (
						<div key={el.time}>
							<h2>{el.title}</h2>
							<img src={el.imgURL} alt="" />
							<h3>{el.writer}</h3>
							<h5>Blog Uploaded: {el.time}</h5>
						</div>
					);
				})}
			</div>
		</div>
	);
}