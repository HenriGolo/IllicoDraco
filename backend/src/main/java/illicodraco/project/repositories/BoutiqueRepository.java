package illicodraco.project.repositories;

import illicodraco.project.beans.Boutique;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository de la Boutique
public interface BoutiqueRepository extends JpaRepository<Boutique, Integer> {

  Boutique save(Boutique boutique);

  Optional<Boutique> findById(Integer id);

  List<Boutique> findAll();

  long count();

}
