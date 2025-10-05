import { useParams, Link } from "react-router-dom";
import { useFetch } from "../useFetch";
import { AdvancedItem } from "./AdvancedItem";

import css from './Problem.module.css';

export const Problem = () => {
    const params = useParams();

    const {problems: [problem], error: [error], loading: [loading]} = useFetch(`/api/v1/problems/${params.chapterNumber}`);

    if (loading) {
        return (
            <div className={css.loading}>
            <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className={css.error}>
            <h1>Error: {error}</h1>
            </div>
        );
    }
    
    return (<main className={css.Drill}>
        <header>
            <div>
                <Link to="/">К выбору практических заданий</Link>
            </div>
            <hr />
            <h1>Практическое задание из раздела "{problem.chapter}"</h1>
            <h3>{problem.heading}</h3>
            <h4>Краткое описание:</h4>
            <p>{problem.input_data}</p>
            <h4>Цели:</h4>
            <ol>
                {
                    problem.objectives.map((goal, index) => {
                        return <li key={index}>{goal}</li>
                    })
                }
            </ol>
        </header>
        <section>
            <h2>Практическое задание</h2>
            {
                problem.problem.map((instruction, index) => {
                    if (typeof instruction === "object"){

                        return <AdvancedItem key={index} {...instruction} />
                    }

                    return <p key={index}>{instruction}</p>
                })
            }
        </section>
        <section>
            <h4>Ожидаемые результаты:</h4>
            <p>{problem.expected_result}</p>
        </section>
        <section>
            { 
                problem.additional_materials && <h3>Дополнительные материалы</h3> 
            }
            {
                problem.additional_materials && problem.additional_materials.map((resource, index) => {

                    if (typeof resource === "object"){

                        return <AdvancedItem key={index} {...resource} />
                    }

                    return <p key={index}>{resource}</p>
                })
            }
        </section>
        <footer>
            <hr />
            <section>
                <div>
                    <Link to="/">К выбору практических заданий</Link>
                </div>
                <div>
                    <p>
                        Книга "Разработка фронтенд-приложений"
                    </p>
                    <p>
                        Издательство "Питер", ISBN: 978-5-4461-4272-9
                    </p>
                    <p>
                        <a href='https://www.piter.com/product_by_id/1515624649'>Книга на сайте издательства</a>
                    </p>
                </div>
            </section>
        </footer>
    </main>);
};