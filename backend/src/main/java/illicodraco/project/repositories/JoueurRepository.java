package illicodraco.project.repositories;

import illicodraco.project.beans.Joueur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository du Joueur
public interface JoueurRepository extends JpaRepository<Joueur, Integer> {

  Joueur save(Joueur joueur);

  Optional<Joueur> findById(Integer id);

  List<Joueur> findAll();

  long count();

}
