import { Tabs } from 'antd';
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable"
function Admin() {

  const tabItems = [
    {
      key: '1',
      label: 'Movies',
      children: <div><MovieList /></div>
    },
    {
      key: '2',
      label: 'Theatres',
      children: <div><TheatresTable /></div>
    }
  ];

  return (
    <div>
      <h1>Admin Page</h1>
      <Tabs items={tabItems} />
    </div>
  )
}

export default Admin;