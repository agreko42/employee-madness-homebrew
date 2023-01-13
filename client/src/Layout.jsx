import {Outlet, Link} from "react-router-dom"

const Layout = () => {
    return (
    <div className="Layout">
        <nav>
            <ul>
                <li>
                <Link to="/employees">
                    <button>
                        Employees
                    </button>
                </Link>
                </li>
                <li>
                <Link to="/equipment">
                    <button>
                        Equipment
                    </button>
                </Link>
                </li>
            </ul>
        </nav>

        <Outlet/>

    </div>
    )
}

export default Layout;