import { FIREBASE_APP } from "../../FirebaseConfig";
import { getFirestore, where } from "firebase/firestore";
import { collection, query, getDoc, getDocs, } from "firebase/firestore";

export const getAlunosWithList = async (listId) => {
    const db = getFirestore(FIREBASE_APP);
    const listAlunoRef = collection(db, "ListaAluno");
    
    const listAlunoQuery = query(listAlunoRef, where("codigo", "==", listId));
    const listAlunoSnapshot = await getDocs(listAlunoQuery);

    const alunos = [];

    for(const aluno of listAlunoSnapshot.docs) {
        const alunoData = aluno.data();
        
        const alunoUser = await getDoc(alunoData.aluno);
        const alunoUserData = alunoUser.data();

        const alunoObject = {
            name: alunoUserData.nome,
            correctAnswers: alunoData.acertos,
            incorrectAnswers: alunoData.erros,
            finalizeList: alunoData.finalizado,
        };

        alunos.push(alunoObject);
    }
    
    return alunos;
};
