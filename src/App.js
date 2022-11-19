import { Fragment, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import DefaultLayout from './layouts';

export const AuthUserContext = createContext()
function App() {
    const authUser = JSON.parse(localStorage.getItem('user'))
    return (
        <AuthUserContext.Provider value={authUser}>
            <Router>
                <div className="App">
                    <Routes>
                        {/* <Route path="/" element={<Home />}></Route>
                        <Route path="/following" element={<Following />}></Route> */}
    
                        {publicRoutes.map((route, index) => {
                            // const Layout = route.layout ===null ?Fragment : DefaultLayout;
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
    
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </AuthUserContext.Provider>
    );
}

export default App;
