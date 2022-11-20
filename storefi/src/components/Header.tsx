import { ConnectButton } from "web3uikit"
import styles from "./nav.module.css"
import { Button, Link } from "@mui/material"

function Header() {
    return (
        <nav>
            <div className={styles.navBar}>
                <div className="left-container">
                    <Button className="board" href="/">Board</Button>
                    <Button className="newListing" href="/newListing">Create a new Listing</Button>
                </div>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}

export default Header
