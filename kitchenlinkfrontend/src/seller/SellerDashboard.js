import { useEffect, useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./sellerDashboard.module.css";
import { appAxios } from "../axios/appAxios";
import { sellerAxios } from "../axios/sellerAxios";
const sellerDashbordTabs = {
  EDIT_RESTAURANT_DETAILS: "editRestaurantDetails",
  EDIT_FOOD_MENU: "editFoodMenu",
  MANAGE_STAFF: "manageStaff",
  COMING_SOON: "comingSoon",
};
export const SellerDashboard = () => {
  const [key, setKey] = useState(sellerDashbordTabs.EDIT_RESTAURANT_DETAILS);
  const navigate = useNavigate();

  const sellerDetails = useSelector((state) => state?.user?.sellerDetails);

  useEffect(() => {
    if (!sellerDetails?.restaurantDetails || !sellerDetails?.imagesSaved) {
      navigate("/seller/setup");
    }
  }, [sellerDetails]);

  useEffect(() => {
    if (sellerDetails?.restaurantDetails && sellerDetails?.imagesSaved) {
      navigate(`${sellerDashbordTabs.EDIT_RESTAURANT_DETAILS}`);
    }
  }, []);
  return (
    <div className={styles.sellerDashboardPage}>
      <Tab.Container
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => navigate(k)}
        className=""
      >
        <Row className={`m-0 p-0 ${styles.dashboard}`}>
          <Col sm={2} className="h-100  p-2">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  className="p-0"
                  eventKey={sellerDashbordTabs.EDIT_RESTAURANT_DETAILS}
                >
                  <div
                    onClick={() =>
                      setKey(sellerDashbordTabs.EDIT_RESTAURANT_DETAILS)
                    }
                    className={`${styles.tab} ${
                      key === sellerDashbordTabs.EDIT_RESTAURANT_DETAILS &&
                      styles.activeTab
                    }`}
                  >
                    Restaurant Details
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey={sellerDashbordTabs.EDIT_FOOD_MENU}
                  className="p-0"
                >
                  <div
                    onClick={() => setKey(sellerDashbordTabs.EDIT_FOOD_MENU)}
                    className={`${styles.tab} ${
                      key === sellerDashbordTabs.EDIT_FOOD_MENU &&
                      styles.activeTab
                    }`}
                  >
                    Food Menu
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey={sellerDashbordTabs.MANAGE_STAFF}
                  className="p-0"
                >
                  <div
                    onClick={() => setKey(sellerDashbordTabs.MANAGE_STAFF)}
                    className={`${styles.tab} ${
                      key === sellerDashbordTabs.MANAGE_STAFF &&
                      styles.activeTab
                    }`}
                  >
                    Manage Staff
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey={sellerDashbordTabs.COMING_SOON}
                  className="p-0"
                >
                  <div
                    onClick={() => setKey(sellerDashbordTabs.COMING_SOON)}
                    className={`${styles.tab} ${
                      key === sellerDashbordTabs.COMING_SOON && styles.activeTab
                    }`}
                  >
                    Inventory
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  // eventKey={sellerDashbordTabs.COMING_SOON}
                  className="p-0"
                >
                  <div
                    // onClick={() => setKey(sellerDashbordTabs.COMING_SOON)}
                    className={`${styles.tab} `}
                  >
                    Customers
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  // eventKey={sellerDashbordTabs.COMING_SOON}
                  className="p-0"
                >
                  <div
                    // onClick={() => setKey(sellerDashbordTabs.COMING_SOON)}
                    className={`${styles.tab} `}
                  >
                    Sales and Transactions
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  // eventKey={sellerDashbordTabs.COMING_SOON}
                  className="p-0"
                >
                  <div
                    // onClick={() => setKey(sellerDashbordTabs.COMING_SOON)}
                    className={`${styles.tab} `}
                  >
                    Feedback and Reviews
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  // eventKey={sellerDashbordTabs.EXPENCES}
                  className="p-0"
                >
                  <div
                    // onClick={() => setKey(sellerDashbordTabs.EXPENCES)}
                    className={`${styles.tab} `}
                  >
                    Expenses
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className={styles.dashboardContent}>
            <Tab.Content>
              <Outlet />
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};
