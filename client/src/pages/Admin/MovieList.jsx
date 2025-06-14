import { useEffect, useState } from "react";
import { getAllMovies } from "../../api/movies";
import MovieForm from "./MovieForm";

import { Table, Button } from "antd";

import {
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMovie, setEditMovie] = useState(null);
  const getData = async () => {
    const response = await getAllMovies();
    let allMovies = response.data;
    allMovies = allMovies.map(function (item) {
      return { ...item, key: `movie${item._id}` };
    })
    setMovies(
      allMovies
    );
  }
  const handleEdit = (value) => {
    setIsModalOpen(true);
    setEditMovie(value);
  };
  const handleDelete = (value) => {
    console.log(value);
  };

  useEffect(() => {
    getData();
  }, [])

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      width: "5%",
      render: (text, data) => {
        return (
          <img src={data.poster} width="75" height="115" />
        )
      },
    },
    {
      title: "Movie Name",
      dataIndex: "title",
      key: "title",
      width: "5%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "10%",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: "5%",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "5%",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      width: "5%",
      render: (text) => {
        let newDate = new Date(text);
        const formattedDate = newDate.toDateString();
        return (
          <span>{formattedDate}</span>
        )
      }
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      width: "5%",
    },
    {
      title: 'Actions',
      key: 'actions',
      width: "5%",
      render: (text, record) => (
      <div>
        <EditOutlined 
          onClick={() => handleEdit(record)} 
          style={{ color: 'blue', marginRight: 12, cursor: 'pointer' }} 
        />
        <DeleteOutlined 
          onClick={() => handleDelete(record)} 
          style={{ color: 'red', cursor: 'pointer' }} 
        />
      </div>
    ),
    }
  ]

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setEditMovie(null);
          }}
        >
          Add Movie
        </Button>
      </div>
        {
          isModalOpen &&
          <MovieForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isEditMovie={isEditMovie}
          />
        }
        <Table columns={tableHeadings} dataSource={movies} scroll={{ x: 'max-content' }} />
    </>
  )

}

export default MovieList;