import "./About.css"
import Card from "../../components/card/card";
import StarPanel from "../../components/starPanel/starPanel";

type AboutPageProps = {
    aboutOpen: boolean;
    setAboutOpen: (aboutOpen: boolean) => void;
}

const AboutPage = ({ aboutOpen, setAboutOpen }: AboutPageProps) => {
    return (
        <div className="about-page">
            <div className="about">
                <Card>
                    <main className="about-content">
                        <h1 className="about-header">About This Tool</h1>
                        <p>
                            This tool was built specifically for the Battery Creek Sandbar in Beaufort, SC.
                            It takes annual tide predictions and overlays the data on a calendar to show the most optimal days to visit the sandbar.
                            I've also included a weather overlay using NOAA's weather API to show the weather forecast for the next 7 days.
                            The app is mobile responsive and can be viewed on any device.
                        </p>
                        <p>
                            I've defaulted the optimal low tide time to 1:30pm on the weekend and 5pm on weekdays.
                        </p>
                        <h2 className="about-subheader">Star Rating</h2>
                        <p>
                            Every day is evaluated on a 1 to 5 star scale based on the user's preferred low tide time, temperature, and weather forecast with the assumption that the sandbar is out for roughly 3 hours.
                            Days without a rating are simply 0 star days where the sand bar isn't out during the preferred time or the weather negated the sandbar time.
                        </p>
                        <p>
                            Be sure to check the weather. Low star days can make for great float days.
                        </p>

                        <StarPanel numStars={5}></StarPanel>
                        <p>
                            5 stars = Best day to visit the sandbar
                        </p>
                        <p>To achieve a 5 star rating: </p>
                        <ul>
                            <li>Low tide falls within a one hour window of the users preferred low tide.</li>
                            <li>Rain forecast must be under 20% </li>
                            <li>Temperature above 80 degrees.</li>
                        </ul>
                        <p>
                            Stars are deducted for each of the criteria at the following rate:
                        </p>
                        <div className="star-rating-section">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Criteria</th>
                                        <th>Star Deduction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Low tide falls outside of the one hour window</td>
                                        <td>-0.5 star every 30 minutes<StarPanel numStars={0.5} noEmptyStars /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Criteria</th>
                                        <th>Star Deduction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Rain forecast over 20%</td>
                                        <td>-0.5 star <StarPanel numStars={0.5} noEmptyStars /></td>
                                    </tr>
                                    <tr>
                                        <td>Rain forecast over 30%</td>
                                        <td>-1 star <StarPanel numStars={1} noEmptyStars /></td>
                                    </tr>
                                    <tr>
                                        <td>Rain forecast over 60%</td>
                                        <td>-1.5 stars <StarPanel numStars={1.5} noEmptyStars /></td>
                                    </tr>
                                    <tr>
                                        <td>Rain forecast over 80%</td>
                                        <td>-3 stars <StarPanel numStars={3} noEmptyStars /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Criteria</th>
                                        <th>Star Deduction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Temperature Below 80F</td>
                                        <td>-0.5 star <StarPanel numStars={0.5} noEmptyStars /></td>
                                    </tr>
                                    <tr>
                                        <td>Temperature Below 70F</td>
                                        <td>-1 stars <StarPanel numStars={1} noEmptyStars /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h2 className="about-subheader">Technical Nonsense and Future Dev.</h2>
                        <p>
                            The stack is simple React + Python. I wrote this on purpose without using 3rd party libraries, I feel like in many cases people are bloating simple software with libraries
                            they're only using 10% of. On the React end I'm only using tanstack's React Query even that is entirely unnecessary and I'll likely rip it out in the future.
                            On the Python side I'm using FastAPI to serve the data to the frontend and just requests to fetch the NOAA data.
                        </p>

                        <p>Future work: </p>
                        <ul>
                            <li>Find a way to make this more flexible for other sandbars - at least in the lowcountry</li>
                            <li>Potentially expand the forecast out more and weight further out forecasts less</li>
                            <li>UI Revamp...I'm not a UI designer so the initial version isn't groundbreaking</li>
                            <li>Full Accessibility review-right now AXE scans pass it as AA (except for some color contrast issues addressed in the UI revamp) but I've yet to do a full manual test</li>
                        </ul>

                    </main>
                </Card>
                <Card>
                    <button onClick={() => setAboutOpen(!aboutOpen)} className="about-button">Back To Calendar</button>
                </Card>
            </div>
        </div >
    )
}

export default AboutPage;