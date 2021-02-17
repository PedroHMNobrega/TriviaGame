class IndexDBRepository {
    static dbName = "Trivia_Ranking";
    static tableName = "users";

    static getDb() {
        return new Promise((resolve) => {
            if (!window.indexedDB) {
                window.alert("Your browser does not support IndexedDB. Some features will not be available.");
                return;
            }

            let request = window.indexedDB.open(IndexDBRepository.dbName, 3);

            request.onerror = (event) => {
                window.alert("Database error. Some features will not be available.");
            }
            request.onsuccess = (event) => {
                resolve(request.result);
            }

            request.onupgradeneeded = (event) => {
                let db = event.target.result;
                let objectStore = db.createObjectStore(IndexDBRepository.tableName, {autoIncrement: true});

                objectStore.createIndex("name", "name", {unique: false});
                objectStore.createIndex("category", "category", {unique: false});
                objectStore.createIndex("questions", "questions", {unique: false});
                objectStore.createIndex("score", "score", {unique: false});
            }
        });
    }

    static add(db, game) {
        const data = {
            name: game.name,
            category: game.categoryName,
            questions: game.questions,
            score: game.score
        };

        let transaction = db.transaction([IndexDBRepository.tableName], "readwrite");
        transaction.onerror = (event) => {
            alert("DataBase Error!");
        }

        let objectStore = transaction.objectStore(IndexDBRepository.tableName);
        let request = objectStore.add(data);
        request.onerror = (event) => {
            alert("DataBase Error!");
        }
    }

    static getRanking(db) {
        return new Promise((resolve) => {
            let transaction = db.transaction([IndexDBRepository.tableName]);
            let objectStore = transaction.objectStore(IndexDBRepository.tableName);
            let request = objectStore.getAll();

            request.onerror = (event) => {
                alert("DataBase Error!");
            }

            request.onsuccess = (event) => {
                resolve(event.target.result);
            }
        });
    }
}

export default IndexDBRepository;