import {useRef, useState } from 'react'
import React from 'react'
import Main from '../RetailCreate/Main';
import styles from './Sidenav.module.css';
import List from '../RetailList/List';
const Home = () => {
    const open_click = useRef();
    const [show_create, setshow_create] = useState(true);
    const OpenNav = () => {
        open_click.current.style.width = '250px';
    }
    const CloseNav = () => {
        open_click.current.style.width = '0';
    }

  return (
<>
    <div id="mySidenav" className={styles.sidenav} ref={open_click}>
        <a onClick={CloseNav} className={styles.closebtn}>&times;</a>
        <a onClick={(() => { setshow_create(true); CloseNav(); })}>Create</a>
        <a onClick={(() => { setshow_create(false); CloseNav(); })}>List</a>
    </div>
    <div>
    <span className={styles.open} onClick={OpenNav}>&#9776; open</span>
    </div>
    { show_create && <Main/>}
    { !show_create && <List/>}


    </>
  )
}

export default Home