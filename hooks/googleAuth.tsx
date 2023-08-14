import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { setCookie } from "nookies";

const AuthGoogle = async () => {

  const provider = new GoogleAuthProvider();


  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const usuario = {
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
        number: user.phoneNumber,
        uid: user.uid,
        doc: '',
      }
      setCookie(undefined, 'US', JSON.stringify(usuario), {
        maxAge: 60 * 60 * 24 * 365 // 1 ano
      })


      try {
        const querySnapshot = await db.collection('users').where('uid', '==', user.uid).get()

        if (!querySnapshot.empty) {
          const res = db.collection('users').where('uid', '==', user.uid).get()
          const doc = (await res).docs.map((e) => ({ ...e.data() }))
          console.log(doc[0]);
          setCookie(undefined, 'US', JSON.stringify(doc[0]), {
            maxAge: 60 * 60 * 24 * 365 // 1 ano
          })
        } else {
          // Nenhum documento com o uid foi encontrado
          const id = await db.collection("users"
          ).add(usuario)
          await db.collection("users"
          ).doc(id.id)
            .update({ doc: id.id, })
          usuario.doc = id.id
          setCookie(undefined, 'US', JSON.stringify(usuario), {
            maxAge: 60 * 60 * 24 * 365 // 1 ano
          })
        }
        window.location.reload();
      } catch (error) {

      }


    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export default AuthGoogle