package illicodraco.project.repositories;

import illicodraco.project.beans.Recette;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository des Recettes
public interface RecetteRepository extends JpaRepository<Recette, Integer> {

  Recette save(Recette recette);

  Optional<Recette> findById(Integer id);

  List<Recette> findAll();

  long count();

}
