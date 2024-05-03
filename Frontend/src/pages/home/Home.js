import React, { useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faTruckFast, faBasketShopping, faUsers, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../env';
import Loading from '../../components/loading/Loading';

const Home = () => {
    localStorage.setItem('selectedView', 'home');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [dataSummary, setDataSummary] = useState(null);

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Query data
        (async () => {
            const url = new URL(`${API}/api/v1/data/summary`);
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setDataSummary(data);
                    setIsLoading(false);
                })
                .catch(error => console.log(error))
        })();
    }, [navigate]);

    return (
        <div className="home-container">
            <div className="text">Dashboard</div>

            {!isLoading ? (
    <div className="dashboard">

        <div className="row-1">
            <div className="panel item-1">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FontAwesomeIcon icon={faBoxesStacked} className="panel-title-icon" />
                        <span>Items</span>
                    </h3>
                </div>
                <div className="panel-body">
                    <p>
                        {dataSummary && dataSummary.categories && dataSummary.categories.totalCategories > 0
                            ? dataSummary.categories.totalCategories + " category" + (dataSummary.categories.totalCategories > 1 ? "s" : "") + " registered"
                            : "No categories registered"
                        }
                    </p>
                    <p>
                        {dataSummary && dataSummary.articles && dataSummary.articles.totalArticles > 0
                            ? dataSummary.articles.totalArticles + " article" + (dataSummary.articles.totalArticles > 1 ? "s" : "") + " registered"
                            : "No articles registered"
                        }
                    </p>
                    <p>
                        {dataSummary && dataSummary.articles && dataSummary.articles.totalStock > 0
                            ? dataSummary.articles.totalStock + " item" + (dataSummary.articles.totalStock > 1 ? "s" : "") + " in stock"
                            : "No items in stock"
                        }
                    </p>
                </div>
                <div className="panel-footer">
                    <Link to={"/categories"} className='btn'>
                        View categories
                    </Link>
                    <Link to={"/items"} className='btn'>
                        View items
                    </Link>
                </div>
            </div>

            <div className="panel item-2">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FontAwesomeIcon icon={faTruckFast} className="panel-title-icon" />
                        <span>Providers</span>
                    </h3>
                </div>
                <div className="panel-body">
                    <p>
                        {dataSummary && dataSummary.providers && dataSummary.providers.totalProviders > 0
                            ? dataSummary.providers.totalProviders + " provider" + (dataSummary.providers.totalProviders > 1 ? "s" : "") + " registered"
                            : "No providers registered"
                        }
                    </p>
                </div>
                <div className="panel-footer">
                    <Link to={"/providers"} className='btn'>
                        View providers
                    </Link>
                </div>
            </div>

            <div className="panel item-3">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FontAwesomeIcon icon={faUsers} className="panel-title-icon" />
                        <span>Customers</span>
                    </h3>
                </div>
                <div className="panel-body">
                    <p>
                        {dataSummary && dataSummary.customers && dataSummary.customers.totalCustomers > 0
                            ? dataSummary.customers.totalCustomers + " customer" + (dataSummary.customers.totalCustomers > 1 ? "s" : "") + " registered"
                            : "No customers registered"
                        }
                    </p>
                </div>
                <div className="panel-footer">
                    <Link to={"/customers"} className='btn'>
                        View customers
                    </Link>
                </div>
            </div>
        </div>

        <div className="row-2">
            <div className="panel item-4">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FontAwesomeIcon icon={faBasketShopping} className="panel-title-icon" />
                        <span>Purchases</span>
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="item">
                        <p>{dataSummary && dataSummary.purchases ? dataSummary.purchases.totalPurchases : ""} purchases registered</p>
                    </div>
                    <div className="item">
                        <h4>Last month</h4>
                        <p>
                            {dataSummary && dataSummary.purchases && dataSummary.purchases.totalPurchasesInLastMonth > 0
                                ? (dataSummary.purchases.purchaseMoneyInLastMonth.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " in " + dataSummary.purchases.totalPurchasesInLastMonth + " purchase" + (dataSummary.purchases.totalPurchasesInLastMonth > 1 ? "s" : ""))
                                : "No purchases in the last month"
                            }
                        </p>
                    </div>
                    <div className="item">
                        <h4>Last week</h4>
                        <p>
                            {dataSummary && dataSummary.purchases && dataSummary.purchases.totalPurchasesInLastWeek > 0
                                ? (dataSummary.purchases.purchaseMoneyInLastWeek.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " in " + dataSummary.purchases.totalPurchasesInLastWeek + " purchase" + (dataSummary.purchases.totalPurchasesInLastWeek > 1 ? "s" : ""))
                                : "No purchases in the last week"
                            }
                        </p>
                    </div>
                    <div className="item">
                        <h4>Last year</h4>
                        <p>
                            {dataSummary && dataSummary.purchases && dataSummary.purchases.totalPurchasesInLastYear > 0
                                ? (dataSummary.purchases.purchaseMoneyInLastYear.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " in " + dataSummary.purchases.totalPurchasesInLastYear + " purchase" + (dataSummary.purchases.totalPurchasesInLastYear > 1 ? "s" : ""))
                                : "No purchases in the last year"
                            }
                        </p>
                    </div>
                </div>
                <div className="panel-footer">
                    <Link to={"/purchases"} className='btn'>
                        View purchases
                    </Link>
                </div>
            </div>

            <div className="panel item-5">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FontAwesomeIcon icon={faHandHoldingDollar} className="panel-title-icon" />
                        <span>Sales</span>
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="item">
                        <p>{dataSummary && dataSummary.sales ? dataSummary.sales.totalSales : ""} sales registered</p>
                    </div>
                    <div className="item">
                        <h4>Last month</h4>
                        <p>
                            {dataSummary && dataSummary.sales && dataSummary.sales.totalSalesInLastMonth > 0
                                ? (dataSummary.sales.saleMoneyInLastMonth.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " in " + dataSummary.sales.totalSalesInLastMonth + " sale" + (dataSummary.sales.totalSalesInLastMonth > 1 ? "s" : ""))
                                : "No sales in the last month"
                            }
                        </p>    
                    </div>
                    <div className="item">
                        <h4>Last week</h4>
                        <p>
                            {dataSummary && dataSummary.sales && dataSummary.sales.totalSalesInLastWeek > 0
                                ? (dataSummary.sales.saleMoneyInLastWeek.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " in " + dataSummary.sales.totalSalesInLastWeek + " sale" + (dataSummary.sales.totalSalesInLastWeek > 1 ? "s" : ""))
                                : "No sales in the last week"
                            }
                        </p>
                    </div>
                    <div className="item">
                        <h4>Last year</h4>
                        <p>
                            {dataSummary && dataSummary.sales && dataSummary.sales.totalSalesInLastYear > 0
                                ? (dataSummary.sales.saleMoneyInLastYear.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " in " + dataSummary.sales.totalSalesInLastYear + " sale" + (dataSummary.sales.totalSalesInLastYear > 1 ? "s" : ""))
                                : "No sales in the last year"
                            }
                        </p>
                    </div>
                </div>
                <div className="panel-footer">
                    <Link to={"/sales"} className='btn'>
                        View sales
                    </Link>
                </div>
            </div>
        </div>

    </div>
) : (
    <Loading />
)}


        </div>
    );
}

export default Home;
