package illicodraco.project.repositories;

import illicodraco.project.beans.Controles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository de la Boutique
public interface ControlesRepository extends JpaRepository<Controles, Integer> {

  Controles save(Controles boutique);

  Optional<Controles> findById(Integer id);

  List<Controles> findAll();

  long count();

}
