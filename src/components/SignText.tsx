import React from "react";

interface Props {
  appliedOnly: boolean;
}

function SignText(props: Props) {
  if (!props.appliedOnly)
    return (
      <>
        <p>Bienvenue à toi cher(e) aventurièr(e) !</p>
        <p>
          Je suppose que tu n'es pas venu(e) ici pour boire un verre, mais
          plutôt pour une mission ? Je te laisse rejoindre le tableau de quête
          ci-dessous.
          <br />
          Tu y trouvera différentes quêtes proposées par des "
          <em className="green">Maîtres de Jeu</em>" du monde entier !
        </p>
        <p>Bon courage !</p>
      </>
    );

  return (
    <>
      <p>Bienvenue à toi cher(e) aventurièr(e) !</p>
      <p>
        Tu pourra voir ci-dessous la liste des quêtes auxquelles tu as déjà
        candidaté. N'hésite pas à continuer de regarder les autres quêtes pour
        voir s'il n'y en a pas une qui te tape dans l'oeil !
      </p>
      <p>Bon courage !</p>
    </>
  );
}

export default SignText;
