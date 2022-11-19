import { ConnectButton } from "web3uikit"
import styles from "./nav.module.css"
import {Button, Link} from "@mui/material"

function redirectToNewListing() {

}

function Header() {
    return (
        <nav>
            <div className={styles.navBar}>
                <ConnectButton moralisAuth={false}/>
                <Button href="/">Board</Button>
                <Button href="/newListing">Create a new Listing</Button>
            </div>
        </nav>
    )
}

export default Header;